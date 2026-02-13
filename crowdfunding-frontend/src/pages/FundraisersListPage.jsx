import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./FundraisersListPage.css";

function FundraisersListPage() {
    const { fundraisers } = useFundraisers();
    const [searchTerm, setSearchTerm] = useState('');

  // Filter on search term
    const filteredFundraisers = fundraisers.filter(fundraiser =>
        fundraiser.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="fundraisers-list-page">
            <div className="container">
                <h1 className="page-title">All Fundraisers</h1>
                <p className="page-subtitle">Support amazing causes and help make a difference</p>
                
                {/* Search Bar */}
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search fundraisers by title..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                />
                <span className="search-icon">🔍</span>
            </div>

            {/* Results Count */}
            <div className="results-info">
                {searchTerm && (
                    <p className="results-text">
                        Found {filteredFundraisers.length} fundraiser{filteredFundraisers.length !== 1 ? 's' : ''} 
                        {searchTerm && ` matching "${searchTerm}"`}
                    </p>
                )}
            </div>
            
            {/* Fundraisers Grid */}
            {filteredFundraisers.length === 0 ? (
                <div className="no-results">
                    <p>No fundraisers found matching "{searchTerm}"</p>
                    <button onClick={() => setSearchTerm('')} className="btn btn-secondary">
                    Clear Search
                    </button>
                </div>
            ) : (
                <div id="fundraiser-list">
                    {filteredFundraisers.map((fundraiserData, key) => {
                        return (
                            <div key={key} className="fundraiser-card-wrapper">
                            <FundraiserCard fundraiserData={fundraiserData} />
                            {!fundraiserData.is_open && (
                                <span className="status-badge status-closed">Closed</span>
                            )}
                            </div>
                        );
                    })}
                </div>
                )}
            </div>
        </div>
    );
}

export default FundraisersListPage;