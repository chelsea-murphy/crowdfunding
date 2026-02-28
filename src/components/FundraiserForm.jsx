import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postFundraiser from "../api/post-fundraiser.js";
import "./FundraiserForm.css";

function FundraiserForm() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    const [fundraiserData, setFundraiserData] = useState({
        title: "",
        description: "",
        goal: "",
        image: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFundraiserData((prevData) => ({
        ...prevData,
        [id]: value,
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
        if (!fundraiserData.title || fundraiserData.title.trim().length === 0) {
        newErrors.title = "Title is required";
        }
        if (!fundraiserData.description || fundraiserData.description.trim().length === 0) {
        newErrors.description = "Description is required";
        }
        if (!fundraiserData.goal || fundraiserData.goal <= 0) {
        newErrors.goal = "Please enter a valid goal amount";
        }
        if (!fundraiserData.image || fundraiserData.image.trim().length === 0) {
        newErrors.image = "Image URL is required";
        }

        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
        }

        setIsLoading(true);

        try {
        const response = await postFundraiser(fundraiserData);
        
        // Success! Redirect to the new fundraiser page
        navigate(`/fundraiser/${response.id}`);
        } catch (error) {
        setErrors({ general: error.message || "Failed to create fundraiser. Please try again." });
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <form className="fundraiser-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create Your Fundraiser</h2>
        <p className="form-subtitle">Share your story and inspire others to support your cause</p>
        
        {errors.general && (
            <div className="error-message">{errors.general}</div>
        )}

        {/* Title */}
        <div className="form-group">
            <label htmlFor="title">Fundraiser Title *</label>
            <input
            type="text"
            id="title"
            placeholder="e.g., Books for Rural School Library"
            value={fundraiserData.title}
            onChange={handleChange}
            disabled={isLoading}
            maxLength="200"
            />
            {errors.title && <span className="field-error">{errors.title}</span>}
            <p className="field-help">Make it clear and compelling</p>
        </div>

        {/* Description */}
        <div className="form-group">
            <label htmlFor="description">Tell Your Story *</label>
            <textarea
            id="description"
            placeholder="Describe why you're raising funds and how they'll be used..."
            rows="6"
            value={fundraiserData.description}
            onChange={handleChange}
            disabled={isLoading}
            />
            {errors.description && <span className="field-error">{errors.description}</span>}
            <p className="field-help">Share the impact this fundraiser will have</p>
        </div>

        {/* Goal Amount */}
        <div className="form-group">
            <label htmlFor="goal">Fundraising Goal *</label>
            <div className="amount-input-wrapper">
            <span className="currency-symbol">$</span>
            <input
                type="number"
                id="goal"
                placeholder="0.00"
                step="0.01"
                min="1"
                value={fundraiserData.goal}
                onChange={handleChange}
                disabled={isLoading}
            />
            </div>
            {errors.goal && <span className="field-error">{errors.goal}</span>}
            <p className="field-help">How much do you need to raise?</p>
        </div>

        {/* Image URL */}
        <div className="form-group">
            <label htmlFor="image">Image URL *</label>
            <input
            type="url"
            id="image"
            placeholder="https://example.com/image.jpg or use https://picsum.photos/400/250"
            value={fundraiserData.image}
            onChange={handleChange}
            disabled={isLoading}
            />
            {errors.image && <span className="field-error">{errors.image}</span>}
            <p className="field-help">Use a placeholder like: https://picsum.photos/400/250</p>
        </div>

        {/* Image Preview */}
        {fundraiserData.image && (
            <div className="image-preview">
            <p className="preview-label">Image Preview:</p>
            <img 
                src={fundraiserData.image} 
                alt="Preview" 
                onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x250?text=Invalid+Image+URL';
                }}
            />
            </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Creating Fundraiser..." : "Create Fundraiser"}
        </button>

        <p className="form-disclaimer">
            By creating a fundraiser, you agree to use funds responsibly for literacy purposes.
        </p>
        </form>
    );
}

export default FundraiserForm;