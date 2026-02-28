import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

function AboutPage() {
    return (
        <div className="AboutPage">
            {/* Hero Section with Image */}
                <section className="hero">
                    <div className="hero-overlay"></div>
                    <div className="container hero-content">
                        <h1 className="hero-title">About Book Bank</h1>
                        <p className="hero-subtitle">
                            Empowering literacy through community-driven fundraising
                        </p>
                    </div>
            </section>

                {/* Mission Section */}
                <section className="content-section">
                        <div className="container">
                            <h2 className="section-heading">Our Mission</h2>
                            <p className="paragraph">
                                Book Bank is dedicated to making literacy accessible to everyone. We believe that every 
                                person deserves access to books and reading materials, regardless of their circumstances. 
                                Through our platform, communities can come together to fund literacy initiatives, support 
                                schools, and help individuals discover the transformative power of reading.
                            </p>

                            <h2 className="section-heading">Our Story</h2>
                            <p className="paragraph">
                                Inspired by Roald Dahl's beloved character Matilda, who found solace and strength in 
                                books, Book Bank was founded on the principle that reading changes lives. We've seen 
                                firsthand how access to books can open doors, spark imaginations, and create opportunities.
                            </p>
                            <p className="paragraph">
                                What started as a small community project has grown into a movement. Today, thousands 
                                of people use Book Bank to support literacy initiatives in their communities and beyond.
                            </p>

                            <div className="hero-actions">
                                    <Link to="/fundraisers" className="btn btn-primary btn-large">
                                        Browse Fundraisers
                                    </Link>
                                    <Link to="/start-fundraiser" className="btn btn-secondary btn-large">
                                        Start Your Campaign
                                    </Link>
                            </div>
                        </div>
                </section>
        </div>
    );
}

export default AboutPage;