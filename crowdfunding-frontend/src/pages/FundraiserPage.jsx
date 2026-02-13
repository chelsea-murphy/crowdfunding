import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import ToggleFundraiserStatus from "../components/ToggleFundraiserStatus";
import EditFundraiserForm from "../components/EditFundraiserForm";
import "./FundraiserPage.css";

function FundraiserPage() {
    const { id } = useParams();
    const { fundraiser, isLoading, error } = useFundraiser(id);
    const [isOpen, setIsOpen] = useState(null)
    const [isEditing, setIsEditing] = useState(false);
    const [fundraiserData, setFundraiserData] = useState(null);

    const isOwner = fundraiser && fundraiser.owner === parseInt(window.localStorage.getItem("userId"));

    const handleStatusChange = (newStatus) => {
        setIsOpen(newStatus);
    };

    const handleUpdate = (updatedData) => {
        setFundraiserData(updatedData);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    if (isLoading) {
        return (
            <div className="fundraiser-page">
                <div className="container">
                    <p className="loading">Loading fundraiser...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fundraiser-page">
                <div className="container">
                    <p className="error-message">{error.message}</p>
                </div>
            </div>
        );
    }

    const displayData = fundraiserData || fundraiser;
    const currentIsOpen = isOpen !== null ? isOpen : fundraiser.is_open;

    return (
        <div className="fundraiser-page">
            <div className="container">
                <div className="fundraiser-detail">
                {/* Fundraiser Header */}
                <div className="fundraiser-header">
                    <h1 className="fundraiser-title">{fundraiser.title}</h1>
                    <p className="fundraiser-meta">Created: {new Date(fundraiser.date_created).toLocaleDateString()}</p>
                    <span className={`status-badge ${currentIsOpen ? 'status-open' : 'status-closed'}`}>
                        {currentIsOpen ? 'Active' : 'Closed'}
                </span>
            </div>

            {/* Owner Controls - if user is the owner, this will show */}
            {isOwner && (
                <div className="owner-controls">
                    {!isEditing && (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="btn btn-secondary edit-button"
                        >
                            Edit Fundraiser
                        </button>
                    )}

                    <ToggleFundraiserStatus
                        fundraiserId={id}
                        currentStatus={currentIsOpen}
                        onStatusChange={handleStatusChange}   
                    />
                </div>            
            )}

                {/* Edit form, only show if editing */}
                {isOwner && isEditing && (
                    <EditFundraiserForm
                        fundraiser={displayData}
                        onUpdate={handleUpdate}
                        onCancel={handleCancelEdit}
                    />
                )}

                {/* Fundraiser Image */}
                {fundraiser.image && (
                    <img 
                        src={fundraiser.image} 
                        alt={fundraiser.title} 
                        className="fundraiser-detail-image"
                    />
                )}

                {/* Fundraiser Description */}
                {fundraiser.description && (
                    <div className="fundraiser-description">
                        <h3>About this fundraiser</h3>
                        <p>{fundraiser.description}</p>
                    </div>
                )}

                {/* Goal */}
                {fundraiser.goal && (
                    <div className="fundraiser-goal">
                        <h3>Goal: ${fundraiser.goal}</h3>
                    </div>
                )}

                {/* Make a Pledge Button, if open */}
                {currentIsOpen && (
                    <Link 
                        to={`/fundraiser/${id}/pledge`} 
                        className="btn btn-primary btn-large pledge-button"
                    >
                        Make a Pledge
                    </Link>
                )}

                {/*Soz, we're closed */}
                {!currentIsOpen && (
                    <div className="closed-message">
                        <p>Sorry, this fundraiser is now closed.</p>
                    </div>
                )}

                    {/* Pledges List */}
                    <div className="pledges-section">
                        <h3 className="section-title">
                            Pledges ({fundraiser.pledges.length})
                        </h3>
                        {fundraiser.pledges.length === 0 ? (
                            <p className="no-pledges">No pledges yet. Be the first to support this fundraiser!</p>
                        ) : (
                            <ul className="pledges-list">
                                {fundraiser.pledges.map((pledgeData, key) => (
                                    <li key={key} className="pledge-item">
                                        <div className="pledge-info">
                                            <span className="pledge-supporter">
                                                {pledgeData.anonymous ? 'Anonymous' : (pledgeData.supporter_name || pledgeData.supporter)}
                                            </span>
                                            {pledgeData.comment && (
                                                <p className="pledge-comment">"{pledgeData.comment}"</p>
                                            )}
                                        </div>
                                        <span className="pledge-amount">${pledgeData.amount}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FundraiserPage;