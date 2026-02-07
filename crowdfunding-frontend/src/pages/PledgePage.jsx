import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PledgeForm from '../components/PledgeForm';
import './PledgePage.css';

function PledgePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fundraiser, setFundraiser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    // Check if user is logged in
        const token = window.localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

    // Fetch fundraiser details
        fetch(`${import.meta.env.VITE_API_URL}/fundraisers/${id}/`)
            .then((response) => response.json())
            .then((data) => {
                setFundraiser(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching fundraiser:", error);
                setIsLoading(false);
            });
    }, [id, navigate]);

    if (isLoading) {
        return (
            <div className="pledge-page">
                <div className="container">
                    <div className="loading">Loading...</div>
                </div>
            </div>
        );
    }

    if (!fundraiser) {
        return (
            <div className="pledge-page">
                <div className="container">
                    <div className="error-message">Fundraiser not found</div>
                </div>
            </div>
        );
    }

    return (
        <div className="pledge-page">
            <div className="container">
            <PledgeForm 
                fundraiserId={id} 
                fundraiserTitle={fundraiser.title}
            />
            </div>
        </div>
    );
}

export default PledgePage;