import { useState } from 'react';
import './EditFundraiserForm.css';

function EditFundraiserForm({ fundraiser, onUpdate, onCancel }) {
    const [formData, setFormData] = useState({
        title: fundraiser.title,
        image: fundraiser.image,
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        const token = window.localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in");
            return;
        }

        setIsUpdating(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiser.id}/`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        image: formData.image,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Failed to update fundraiser');
        }

        const data = await response.json();
        onUpdate(data); // Pass updated data back to parent
    } catch (err) {
        setError(err.message);
    } finally {
        setIsUpdating(false);
    }
};

return (
        <div className="edit-fundraiser-form">
            <h3 className="edit-form-title">Edit Fundraiser</h3>
            
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Fundraiser Title *</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        disabled={isUpdating}
                        required
                        maxLength="200"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL *</label>
                    <input
                        type="url"
                        id="image"
                        value={formData.image}
                        onChange={handleChange}
                        disabled={isUpdating}
                        required
                    />
                    <p className="field-help">Use a placeholder like: https://picsum.photos/400/250</p>
                </div>

            {/* Image Preview */}
            {formData.image && (
                <div className="image-preview">
                    <p className="preview-label">Preview:</p>
                    <img 
                        src={formData.image} 
                        alt="Preview" 
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x250?text=Invalid+Image+URL';
                        }}
                    />
                </div>
            )}

            <div className="form-actions">
                <button 
                    type="button" 
                    onClick={onCancel} 
                    className="btn btn-secondary"
                    disabled={isUpdating}
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isUpdating}
                >
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
                </div>
            </form>
        </div>
    );
}

export default EditFundraiserForm;