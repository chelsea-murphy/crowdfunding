import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FundraiserForm from '../components/FundraiserForm';
import './CreateFundraiserPage.css';

function CreateFundraiserPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const token = window.localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="create-fundraiser-page">
            <div className="container">
                <FundraiserForm />
            </div>
        </div>
    );
}

export default CreateFundraiserPage;