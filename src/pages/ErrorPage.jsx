import { Link, useRouteError } from 'react-router-dom';
import './ErrorPage.css';

function ErrorPage() {
    const error = useRouteError();
    
    // Handle Response objects thrown from components
    let title = 'Oops! Something went wrong';
    let message = 'An unexpected error occurred. Please try again later.';
    let emoji = '⚠️';
    
    // Check if error is a Response object (thrown with new Response())
    if (error instanceof Response) {
        if (error.status === 404) {
            title = 'Page Not Found';
            message = "The page you're looking for doesn't exist or has been moved.";
            emoji = '📚';
        } else if (error.status === 403 || error.status === 401) {
            title = 'Access Denied';
            message = "You don't have permission to view this page.";
            emoji = '🔒';
        }
    }
    
    return (
        <div className="error-page">
            <div className="container">
                <div className="error-content">
                    <div className="error-emoji">{emoji}</div>
                    <h1 className="error-title">{title}</h1>
                    <p className="error-message">{message}</p>
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

export default ErrorPage;