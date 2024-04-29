import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './edit.scss'; // Ensure this import path matches where your SCSS file is located
import Snackbar from '../../../../components/snackbar/snackbar';

function AddAdmin() {
    const [admin, setAdmin] = useState({
        username: '',
        password: '',
        phone_number: '',
        country: '',
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdmin(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/api/admins`, admin)
            .then(response => {
                setSnackbar({ open: true, message: 'Admin added successfully!' });
                setTimeout(() => {
                    closeSnackbar();
                }, 3000);
            })
            .catch(error => {
                console.error('Error adding admin:', error);
                setSnackbar({ open: true, message: 'Failed to add admin.' });
                setTimeout(closeSnackbar, 3000);
            });
    };

    const closeSnackbar = () => {
        setSnackbar({ open: false, message: '' });
    };

    return (
        <div className="edit-table-page">
            <div className="edit-user-form">
                <div className="content-wrapper">
                    <div className="table-container">
                        <h1>Add New Admin</h1>
                        {snackbar.open && (
                            <Snackbar message={snackbar.message} open={snackbar.open} onClose={closeSnackbar} />
                        )}
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={admin.username}
                                    onChange={handleChange}
                                    aria-label="Username"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={admin.password}
                                    onChange={handleChange}
                                    aria-label="Password"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone_number">Phone Number</label>
                                <input
                                    type="text"
                                    id="phone_number"
                                    name="phone_number"
                                    value={admin.phone_number}
                                    onChange={handleChange}
                                    aria-label="Phone Number"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="country">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={admin.country}
                                    onChange={handleChange}
                                    aria-label="Country"
                                    required
                                />
                            </div>

                            <button type="submit">Add Admin</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddAdmin;
