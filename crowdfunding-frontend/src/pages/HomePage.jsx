import React from "react";
import { Link } from "react-router-dom";
import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";

function HomePage() {
    const { fundraisers } = useFundraisers();


    const openFundraisers = fundraisers
        .filter(fundraiser => fundraiser.is_open)
        .slice(0, 9);

    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-image-wrapper">
                    <img 
                    src="/img/BookBankHero.png" 
                    alt="Book Bank Hero" 
                    className="hero-background-image"
                    />
                <div className="hero-overlay"></div>
            </div>
            <div className="container hero-content">
                <h1 className="hero-title">Every Story Starts With a Book</h1>
                <p className="hero-subtitle">Empowering literacy, one fundraiser at a time</p>
            </div>
        </section>

        {/* CTA Section - Moved below hero */}
        <section className="cta-section">
            <div className="container">
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
                
                {openFundraisers.length === 0 ? (
                    <div className="no-fundraisers">
                        <p>No active fundraisers at the moment. Be the first to create one!</p>
                        <Link to="/start-fundraiser" className="btn btn-primary">Start a Fundraiser</Link>
                    </div>
                ) : (
                    <>
                        <div id="fundraiser-list">
                            {openFundraisers.map((fundraiserData, key) => {
                                return <FundraiserCard key={key} fundraiserData={fundraiserData} />;
                            })}
                        </div>
                    
                        {/* See More button - only show if there are more than 9 open fundraisers */}
                        {fundraisers.filter(f => f.is_open).length > 9 && (
                            <div className="see-more-container">
                                <Link to="/fundraisers" className="btn btn-secondary btn-large">
                                    See More Fundraisers
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    </div>
    );
}

export default HomePage;