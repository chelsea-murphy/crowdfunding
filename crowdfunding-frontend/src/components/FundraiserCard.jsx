import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard(props) {
    const { fundraiserData } = props;
    const fundraiserLink = `/fundraiser/${fundraiserData.id}`;

    const totalRaised = fundraiserData.total_raised ?? 0;

    // Calculate progress percentage
    const progressPercentage = fundraiserData.goal 
        ? (fundraiserData.total_raised / fundraiserData.goal) * 100
        : 0;

    // Truncate cards with long descriptions
    const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

    return (
        <div className="fundraiser-card">
            <Link to={fundraiserLink}>
                    <img 
                        src={fundraiserData.image || 'https://via.placeholder.com/400x250?text=No+Image'} 
                        alt={fundraiserData.title} 
                        className="fundraiser-image"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x250?text=Image+Not+Found';
                        }}
                    />
                    <div className="fundraiser-content">
                        <h3 className="fundraiser-title">{fundraiserData.title}</h3>
                        <p className="fundraiser-description">
                            {truncateText(fundraiserData.description, 300)}
                        </p>
                    
                    {/* Progress bar - come back to this!*/}
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{width: `${Math.min(progressPercentage, 100)}%`}} 
                            role="progressbar" 
                            aria-valuenow={progressPercentage} 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <p className="fundraiser-stats">
                        ${totalRaised.toFixed(2)} raised of ${fundraiserData.goal || 0} goal
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default FundraiserCard;