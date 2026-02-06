import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard(props) {
    const { fundraiserData} = props;
    const fundraiserLink = `fundraiser/${fundraiserData.id}`;

return (
    <div className="fundraiser-card">
        <Link to={fundraiserLink}>
            <img 
                src={fundraiserData.image} 
                alt={fundraiserData.title} 
                className="fundraiser-image"
            />
            <div className="fundraiser-content">
                <h3 className="fundraiser-title">{fundraiserData.title}</h3>
                <p className="fundraiser-description">{fundraiserData.description}</p>

                {/* Progress bar - adjust based on your data structure */}
                <div className="progress-bar">
                    <div 
                        className="progress-fill" 
                        style={{width: `${(fundraiserData.current_amount / fundraiserData.goal_amount) * 100}%`}} 
                        role="progressbar" 
                        aria-valuenow={(fundraiserData.current_amount / fundraiserData.goal_amount) * 100} 
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