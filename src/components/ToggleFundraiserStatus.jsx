import { useState } from 'react';
import './ToggleFundraiserStatus.css';

function ToggleFundraiserStatus({ fundraiserId, currentStatus, onStatusChange }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const handleToggle = async () => {
        const token = window.localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in");
            return;
        }

        setIsUpdating(true);
        setError(null);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}/`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                    body: JSON.stringify({
                        is_open: !currentStatus
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update fundraiser status');
            }

            const data = await response.json();
            onStatusChange(data.is_open);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="toggle-fundraiser-status">
            <div className="status-info">
                <span className={`status-badge ${currentStatus ? 'status-open' : 'status-closed'}`}>
                    {currentStatus ? 'Open for Pledges' : 'Closed to Pledges'}
                </span>
                <p className="status-description">
                    {currentStatus 
                        ? 'This fundraiser is currently accepting pledges' 
                        : 'This fundraiser is closed and not accepting new pledges'}
            </p>
        </div>

        <button 
            onClick={handleToggle}
            disabled={isUpdating}
            className={`toggle-button ${currentStatus ? 'btn-close' : 'btn-open'}`}
        >
            {isUpdating 
                ? 'Updating...' 
                : currentStatus 
                    ? 'Close Fundraiser' 
                    : 'Reopen Fundraiser'}
        </button>

            {error && <p className="toggle-error">{error}</p>}
        </div>
    );
}

export default ToggleFundraiserStatus;