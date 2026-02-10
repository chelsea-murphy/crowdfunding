import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard(props) {
    const { fundraiserData } = props;
    const fundraiserLink = `/fundraiser/${fundraiserData.id}`;

    // Calculate progress percentage
    const progressPercentage = fundraiserData.goal 
        ? (fundraiserData.total_raised / fundraiserData.goal) * 100
        : 0;

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
                        <p className="fundraiser-description">{fundraiserData.description}</p>
                    
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
                        ${fundraiserData.current_amount} raised of ${fundraiserData.goal_amount} goal
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default FundraiserCard;