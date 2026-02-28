import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
    return (
        <div className="not-found-page">
        <div className="container">
            <div className="not-found-content">
            <div className="error-code">404</div>
            <h1 className="error-title">Page Not Found</h1>
            <p className="error-message">
                Oops! Looks like this page has gone missing. It might have been removed, 
                or you may have followed a broken link.
            </p>
            <div className="error-icon">📚</div>
            <p className="error-subtitle">
                But, while you're here. "What is a librarian's favorite vegetable? Quiet peas."
            </p>
            <div className="error-actions">
                <Link to="/" className="btn btn-primary btn-large">
                Back to Home
                </Link>
                <Link to="/fundraisers" className="btn btn-secondary btn-large">
                Browse Fundraisers
                </Link>
            </div>
            </div>
        </div>
        </div>
    );
}

export default NotFoundPage;