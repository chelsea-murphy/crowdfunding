import { allFundraisers } from "../data.js";
import FundraiserCard from "../components/FundraiserCard.jsx";
function HomePage() {
    return (
        <div>
            {allFundraisers.map((fundraiserData, key) => {
            return <FundraiserCard key={key} data ={fundraiserData} />;
            })}
        </div>
    );
}

export default HomePage;