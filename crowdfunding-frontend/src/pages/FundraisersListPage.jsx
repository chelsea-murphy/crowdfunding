import React from 'react';
import { Link } from 'react-router-dom';
import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./FundraisersListPage.css";

function FundraisersListPage() {
    const { fundraisers } = useFundraisers();

    return (
        <div className="fundraisers-list-page">
            <div className="container">
                <h1 className="page-title">All Fundraisers</h1>
                <p className="page-subtitle">Support amazing causes and help make a difference</p>
        
                <div id="fundraiser-list">
                    {fundraisers.map((fundraiserData, key) => {
                        return (
                            <div key={key} className="fundraiser-card-wrapper">
                                <FundraiserCard fundraiserData={fundraiserData} />
                                {!fundraiserData.is_open && (
                                    <div className="status-badge status-closed">Closed</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default FundraisersListPage;