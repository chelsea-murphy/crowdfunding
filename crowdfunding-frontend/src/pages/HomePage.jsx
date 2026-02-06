import React from "react";
import { Link } from "react-router-dom";
import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";

function HomePage() {
    const { fundraisers } = useFundraisers();

    return (
        <div className="homepage">
            {/* Hero Section */}
        <section className="hero">
            <div className="container">
                <h1 className="hero-title">Every story starts with a book</h1>
                <p className="hero-subtitle">Turning pages into possibilities</p>
                <div className="hero-actions">
                    <Link to="/fundraisers" className="btn btn-primary btn-large">Browse Fundraisers</Link>
                    <Link to="/start-fundraiser" className="btn btn-secondary btn-large">Start Your Campaign</Link>
                </div>
            </div>
        </section>

      {/* Featured Fundraisers */}
        <section className="featured-section">
            <div className="container">
                <h2 className="section-title">Featured Fundraisers</h2>
                <div id="fundraiser-list">
                    {fundraisers.map((fundraiserData, key) => {
                        return <FundraiserCard key={key} fundraiserData={fundraiserData} />;
                    })}
                </div>
            </div>
        </section>
    </div>
    );
}

export default HomePage;