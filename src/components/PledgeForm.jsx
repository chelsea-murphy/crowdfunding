import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postPledge from "../api/post-pledge.js";
import "./PledgeForm.css";

function PledgeForm({ fundraiserId, fundraiserTitle, onPledgeSuccess }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [pledgeData, setPledgeData] = useState({
        amount: "",
        anonymous: false,
        comment: "",
        // Payment fields (placeholder only)
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
    });

    // Get current date and time for display
    const currentDateTime = new Date().toLocaleString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setPledgeData((prevData) => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value,
        }));
    
        // Clear error for this field
        if (errors[id]) {
            setErrors((prev) => ({ ...prev, [id]: "" }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});

    // Check if user is logged in
    const token = window.localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return;
    }

    // Validation
    const newErrors = {};
    if (!pledgeData.amount || pledgeData.amount <= 0) {
        newErrors.amount = "Please enter a valid amount";
    }
    
    // Placeholder payment validation (not functional)
    if (!pledgeData.cardNumber) {
        newErrors.cardNumber = "Card number is required";
    }
    if (!pledgeData.cardName) {
        newErrors.cardName = "Cardholder name is required";
    }
    if (!pledgeData.expiryDate) {
        newErrors.expiryDate = "Expiry date is required";
    }
    if (!pledgeData.cvv) {
        newErrors.cvv = "CVV is required";
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    setIsLoading(true);

    try {
        await postPledge(fundraiserId, {
            amount: pledgeData.amount,
            comment: pledgeData.comment,
            anonymous: pledgeData.anonymous,
        });

        // Success! Redirect or show success message
        if (onPledgeSuccess) {
            onPledgeSuccess();
        } else {
            navigate(`/fundraiser/${fundraiserId}`, { 
                state: { message: "Thank you for your pledge!" } 
            });
        }
    } catch (error) {
        setErrors({ general: error.message || "Failed to create pledge. Please try again." });
    } finally {
        setIsLoading(false);
    }
};

return (
    <form className="pledge-form" onSubmit={handleSubmit}>
        <h2 className="pledge-form-title">Make a Pledge</h2>
        <p className="pledge-fundraiser-title">Supporting: {fundraiserTitle}</p>
    
        {errors.general && (
            <div className="error-message">{errors.general}</div>
        )}

        {/* Date & Time Display */}
        <div className="pledge-datetime">
            <p className="datetime-label">Pledge Date & Time:</p>
            <p className="datetime-value">{currentDateTime}</p>
        </div>

        {/* Pledge $ Amount */}
        <div className="form-group">
            <label htmlFor="amount">Pledge Amount *</label>
            <div className="amount-input-wrapper">
                <span className="currency-symbol">$</span>
                <input
                    type="number"
                    id="amount"
                    placeholder="0.00"
                    step="0.01"
                    min="1"
                    value={pledgeData.amount}
                    onChange={handleChange}
                    disabled={isLoading}
            />
        </div>
        {errors.amount && <span className="field-error">{errors.amount}</span>}
    </div>

    {/* Anonymous PLedge Option */}
    <div className="form-group checkbox-group">
        <label className="checkbox-label">
            <input
                type="checkbox"
                id="anonymous"
                checked={pledgeData.anonymous}
                onChange={handleChange}
                disabled={isLoading}
            />
            <span>Make this pledge anonymous</span>
        </label>
        <p className="checkbox-help-text">
            Your name will not be displayed publicly with this pledge
        </p>
    </div>

    {/* Optional Comment */}
    <div className="form-group">
            <label htmlFor="comment">Message (Optional)</label>
            <textarea
                id="comment"
                placeholder="Include a message of support..."
                rows="4"
                value={pledgeData.comment}
                onChange={handleChange}
            disabled={isLoading}
        />
    </div>

    {/* Payment Section (Placeholder) */}
    <div className="payment-section">
        <h3 className="payment-section-title">Payment Details</h3>
        <div className="payment-placeholder-notice">
            <p>⚠️ This is a demo payment form. No actual payment will be processed.</p>
        </div>

        <div className="form-group">
            <label htmlFor="cardNumber">Card Number *</label>
            <input
                type="text"
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                value={pledgeData.cardNumber}
                onChange={handleChange}
                disabled={isLoading}
            />
            {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
        </div>

        <div className="form-group">
            <label htmlFor="cardName">Cardholder Name *</label>
            <input
                type="text"
                id="cardName"
                placeholder="Name on card"
                value={pledgeData.cardName}
                onChange={handleChange}
                disabled={isLoading}
            />
            {errors.cardName && <span className="field-error">{errors.cardName}</span>}
        </div>

        <div className="form-row">
            <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date *</label>
                <input
                    type="text"
                    id="expiryDate"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={pledgeData.expiryDate}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                {errors.expiryDate && <span className="field-error">{errors.expiryDate}</span>}
            </div>

            <div className="form-group">
                    <label htmlFor="cvv">CVV *</label>
                    <input
                        type="text"
                        id="cvv"
                        placeholder="123"
                        maxLength="4"
                        value={pledgeData.cvv}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    {errors.cvv && <span className="field-error">{errors.cvv}</span>}
                </div>
            </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="pledge-submit-button" disabled={isLoading}>
            {isLoading ? "Processing..." : `Pledge $${pledgeData.amount || "0.00"}`}
        </button>

        <p className="form-disclaimer">
            By clicking pledge, you agree to our terms and conditions.
        </p>
        </form>
    );
}

export default PledgeForm;