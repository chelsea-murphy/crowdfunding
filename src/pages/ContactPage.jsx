import React from 'react';
import './ContactPage.css';

function ContactPage() {
    return (
        <div className="contact-page">
            <div className="container">
                <div className="contact-header">
                    <h1 className="page-title">Get in Touch</h1>
                    <p className="page-subtitle">
                        Have questions about Book Bank? We'd love to hear from you.
                    </p>
                </div>

                <div className="contact-content">
                    {/* Contact Information */}
                    <div className="contact-info-section">
                        <h2>Contact Information</h2>
                    
                    <div className="contact-info-grid">
                        <div className="contact-info-card">
                            <div className="icon">📧</div>
                            <h3>Email Us</h3>
                            <p>hello@bookbank.com</p>
                            <p className="secondary">bookworms@bookbank.com</p>
                        </div>

                    <div className="contact-info-card">
                        <div className="icon">📱</div>
                        <h3>Call Us</h3>
                        <p>+(07) 3400 1122 </p>
                        <p className="secondary">Mon-Fri, 9am-5pm AEST</p>
                    </div>

                    <div className="contact-info-card">
                        <div className="icon">💬</div>
                        <h3>Social Media</h3>
                        <p>@bookbank</p>
                        <p className="secondary">Follow us for updates</p>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
                <h2>Frequently Asked Questions</h2>
                
                <div className="faq-list">
                    <div className="faq-item">
                        <h3>How do I start a fundraiser?</h3>
                        <p>
                        Click "Start a Fundraiser" in the navigation menu, fill out the form with 
                        your fundraiser details, and submit. Once complete, your fundraiser will go live!
                        </p>
                </div>

                <div className="faq-item">
                    <h3>How do pledges work?</h3>
                    <p>
                        Browse active fundraisers and click "Make a Pledge" on any fundraiser you'd like 
                        to support. You choose your pledge amount and add a comment of support. Support as 
                        many fundraisers as you'd like. The more support, the better!
                    </p>
                </div>

                <div className="faq-item">
                    <h3>Can I edit my fundraiser after creating it?</h3>
                    <p>
                        Yes! As the fundraiser owner, you can edit the title and image, and you can 
                        open or close your fundraiser to pledges at any time.
                    </p>
                </div>

                <div className="faq-item">
                    <h3>Is my personal information secure?</h3>
                    <p>
                        Absolutely. We take privacy seriously and use industry-standard security 
                        measures to protect your data. We never share your information with third parties.
                    </p>
                </div>

                <div className="faq-item">
                    <h3>How long do fundraisers stay active?</h3>
                    <p>
                        Fundraisers remain active until the owner closes them. You have full control 
                        over when to open or close your fundraiser to new pledges. We recommend closing 
                        your fundraiser once you've achieved your goal amount.
                    </p>
                </div>
                </div>
            </div>

            {/* Support Section */}
            <div className="support-section">
                <h2>Need More Help?</h2>
                <p>
                    If you couldn't find the answer you're looking for, please don't hesitate to 
                    reach out to our support team. We're here to help make your Book Bank experience 
                    as smooth as possible.
                </p>
                <a href="mailto:bookworms@bookbank.com" className="btn btn-primary">
                    Email Support
                    </a>
                </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;