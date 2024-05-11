import React from 'react';
import './Snackbar.scss';  // Ensure you have this SCSS file

const Snackbar = ({ message, open, onClose }) => {
    const isSuccess = message === 'Ticket booked successfully!';  // Check if the message indicates success

    return (
        <div className={`snackbar ${open ? 'show' : ''} ${isSuccess ? 'success' : 'error'}`} onClick={onClose}>
            {message}
        </div>
    );
};

export default Snackbar;
