import './UserAvatar.css';

function UserAvatar({ firstName, lastName, username, size = 'large' }) {
    const getInitials = () => {
        if (firstName && lastName) {
            return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
        } else if (firstName) {
        return firstName.substring(0, 2).toUpperCase();
        } else if (username) {
        return username.substring(0, 2).toUpperCase();
        }
        return 'U';
    };

    return (
        <div className={`user-avatar ${size}`}>
            <span>{getInitials()}</span>
        </div>
    );
}

export default UserAvatar;