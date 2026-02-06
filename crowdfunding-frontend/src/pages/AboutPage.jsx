import { Link } from 'react-router-dom';
import './AboutPage.css';

function AboutPage() {
    return (
        <div className="AboutPage">
        {/* Hero Section */}
            <section className="hero">
        <div className="container">
            <h1 className="hero-title">Book Bank</h1>
                <p className="hero-subtitle">Book Bank is a crowdfunding platform dedicated exclusively to improving literacy outcomes</p>
                <p className="paragraph">The platform connects donors who are passionate about education with individuals, schools, and community organisations seeking funding for books, reading programs, and literacy initiatives. Unlike general crowdfunding sites, Book Bank focuses solely on literacy, creating a trusted space where every campaign directly impacts someone's ability to read, learn, and thrive. Inspired by Roald Dahl's Matilda, the platform features verified campaigns, transparent fund tracking, and impact reporting that shows donors exactly how their contributions made a difference. Campaign creators can promote specific campaigns, fund adult literacy courses, or launch community reading programs. Donors can browse by cause, making it easy to support causes that resonate personally. Book Bank rallies the community celebrating milestones with each funded campaign, sharing stories of transformation and progress. Literacy isn't just an academic skill — it's a human right and a tool for freedom. It empowers people to understand the world, imagine a better one, and have the voice to help create it.</p> 
                    <div className="hero-actions">
                        <Link to="/fundraisers" className="btn btn-primary btn-large">Browse Fundraisers</Link>
                        <Link to="/start-fundraiser" className="btn btn-secondary btn-large">Start Your Campaign</Link>
                </div>
            </div>
            </section>
        </div>
    );
}

export default AboutPage;