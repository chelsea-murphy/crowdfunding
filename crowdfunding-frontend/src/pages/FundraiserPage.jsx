import { useParams, Link } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import "./FundraiserPage.css";

function FundraiserPage() {
    const { id } = useParams();
    const { fundraiser, isLoading, error } = useFundraiser(id);

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

    return (
        <div className="fundraiser-page">
            <div className="container">
                <div className="fundraiser-detail">
                {/* Fundraiser Header */}
                <div className="fundraiser-header">
                    <h1 className="fundraiser-title">{fundraiser.title}</h1>
                    <p className="fundraiser-meta">Created: {new Date(fundraiser.date_created).toLocaleDateString()}</p>
                    <span className={`status-badge ${fundraiser.is_open ? 'status-open' : 'status-closed'}`}>
                        {fundraiser.is_open ? 'Active' : 'Closed'}
                </span>
            </div>

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

                {/* Make a Pledge Button */}
                {fundraiser.is_open && (
                    <Link 
                        to={`/fundraiser/${id}/pledge`} 
                        className="btn btn-primary btn-large pledge-button"
                    >
                        Make a Pledge
                    </Link>
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
                                            {pledgeData.anonymous ? 'Anonymous' : pledgeData.supporter}
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