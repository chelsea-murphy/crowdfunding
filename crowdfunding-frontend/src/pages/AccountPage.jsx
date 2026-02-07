import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getUser from '../api/get-user';
import UserAvatar from '../components/UserAvatar';
import './AccountPage.css';

function AccountPage() {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = window.localStorage.getItem("token");
    
    if (!token) {
        navigate("/login");
        return;
    }

    getUser()
        .then((data) => {
            setUserData(data);
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setIsLoading(false);
        // If unauthorized, redirect to login
        if (error.message.includes("401") || 
            error.message.includes("Unauthorised") ||
            error.message.includes("Unauthorized")) {
            window.localStorage.removeItem("token");
            navigate("/login");
        }
    });
}, [navigate]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        navigate("/");
    };

    if (isLoading) {
        return (
            <div className="account-page">
                <div className="container">
                    <div className="loading">Loading your account...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="account-page">
                <div className="container">
                    <div className="error-message">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="account-page">
            <div className="container">
            {/* User Profile Header */}
            <section className="profile-header">
                <UserAvatar 
                    firstName={userData.first_name}
                    lastName={userData.last_name}
                    username={userData.username}
                    size="large"
                />
                <div className="profile-info">
                    <h1 className="profile-name">
                        {userData.first_name && userData.last_name 
                            ? `${userData.first_name} ${userData.last_name}`
                            : userData.username}
                    </h1>
                    <p className="profile-username">@{userData.username}</p>
                    <p className="profile-member-since">
                        Member since {formatDate(userData.date_joined)}
                    </p>
                </div>
                <button onClick={handleLogout} className="btn btn-secondary logout-btn">
                    Logout
                </button>
            </section>

            {/* User Stats */}
            <section className="user-stats">
                <div className="stat-card">
                    <h3 className="stat-number">{userData.pledges.length}</h3>
                    <p className="stat-label">Pledges Made</p>
                </div>
                <div className="stat-card">
                    <h3 className="stat-number">{userData.fundraisers.length}</h3>
                    <p className="stat-label">Fundraisers Created</p>
                </div>
                <div className="stat-card">
                    <h3 className="stat-number">
                        ${userData.pledges.reduce((sum, pledge) => sum + parseFloat(pledge.amount || 0), 0).toFixed(2)}
                    </h3>
                    <p className="stat-label">Total Pledged</p>
                </div>
            </section>

            {/* My Pledges */}
            <section className="account-section">
                <h2 className="section-title">My Pledges</h2>
                {userData.pledges.length === 0 ? (
                    <div className="empty-state">
                        <p>Ready to make your first pledge?</p>
                        <Link to="/" className="btn btn-primary">Browse Fundraisers</Link>
                    </div>
                ) : (
                    <div className="pledge-list">
                        {userData.pledges.map((pledge) => (
                            <div key={pledge.id} className="pledge-card">
                                <div className="pledge-info">
                                    <h3 className="pledge-fundraiser">Fundraiser #{pledge.fundraiser}</h3>
                                    <p className="pledge-comment">{pledge.comment || 'No comment'}</p>
                                    <p className="pledge-date">
                                        Pledged on {formatDate(pledge.date_created)}
                                    </p>
                                </div>
                                <div className="pledge-amount">
                                    <span className="amount">${pledge.amount}</span>
                                    {!pledge.anonymous && <span className="public-badge">Public</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* My Fundraisers */}
            <section className="account-section">
                <h2 className="section-title">My Fundraisers</h2>
                {userData.fundraisers.length === 0 ? (
                    <div className="empty-state">
                        <p>Ready to create your first fundraise?</p>
                        <Link to="/start-fundraiser" className="btn btn-primary">Start a Fundraiser</Link>
                    </div>
                ) : (
                    <div className="fundraiser-grid">
                        {userData.fundraisers.map((fundraiser) => (
                            <Link 
                                key={fundraiser.id} 
                                to={`/fundraiser/${fundraiser.id}`}
                                className="account-fundraiser-card"
                            >
                                <img 
                                    src={fundraiser.image} 
                                    alt={fundraiser.title}
                                    className="fundraiser-image"
                                />
                                <div className="fundraiser-content">
                                    <h3 className="fundraiser-title">{fundraiser.title}</h3>
                                    <div className="fundraiser-stats-small">
                                        <span className={fundraiser.is_open ? 'status-open' : 'status-closed'}>
                                            {fundraiser.is_open ? 'Active' : 'Closed'}
                                        </span>
                                        <span className="goal">${fundraiser.goal}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    </div>
    );
}

export default AccountPage;