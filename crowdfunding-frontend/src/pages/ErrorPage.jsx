import { Link, useRouteError } from 'react-router-dom';
import './ErrorPage.css';

function ErrorPage() {
    const error = useRouteError();
    
    // Determine error type
    const is404 = error?.status === 404 || error?.message?.includes('404');
    const is403 = error?.status === 403 || error?.message?.includes('403') || error?.message?.includes('Forbidden');
    const is401 = error?.status === 401 || error?.message?.includes('401') || error?.message?.includes('Unauthorized');

    // Set content based on error type
    let title = 'Oops! Something went wrong';
    let message = 'An unexpected error occurred. Please try again later.';
    let emoji = '⚠️';

    if (is404) {
        title = 'Page Not Found';
        message = "The page you're looking for doesn't exist or has been moved.";
        emoji = '📚';
    } else if (is403 || is401) {
        title = 'Access Denied';
        message = "You don't have permission to view this page.";
        emoji = '🔒';
    }

    return (
        <div className="error-page">
            <div className="container">
                <div className="error-content">
                    <div className="error-emoji">{emoji}</div>
                    <h1 className="error-title">{title}</h1>
                    <p className="error-message">{message}</p>
                    {error?.message && error.message !== title && (
                        <p className="error-details">{error.message}</p>
                    )}
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