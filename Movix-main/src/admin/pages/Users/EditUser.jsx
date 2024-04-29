import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './edit.scss'; // Ensure this import path matches where your SCSS file is located
import Snackbar from '../../../components/snackbar/snackbar';
function EditUser() {
    const [user, setUser] = useState({
        username: '',
        password: '',
        phone_number: '',
        country: '',
        role: ''
    });
    const { userId } = useParams();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: ''
    });
    useEffect(() => {
        // Fetch the user data from the API
        axios.get(`http://localhost:3001/api/users/${userId}`)
            .then(response => {
                setUser(response.data);
                console.log(response.data); // Assuming the API returns the user object directly
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/api/update/${userId}`, user)
            .then(response => {
                setSnackbar({ open: true, message: 'Added successfully!' });
                setTimeout(closeSnackbar, 3000); // Auto-close the Snackbar after 3 seconds

            })
            .catch(error => {
                console.error('Error updating user:', error);
                setSnackbar({ open: true, message: 'Failed to update user.' });
                setTimeout(closeSnackbar, 3000); // Auto-close the Snackbar after 3 seconds

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
                        <h1>Edit User</h1>
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
                                    value={user.username}
                                    onChange={handleChange}
                                    aria-label="Username"
                                    required  // Add required attribute
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    aria-label="Password"
                                    required  // Add required attribute
                                />
                            </div>
                            <div>
                                <label htmlFor="phone_number">Phone Number</label>
                                <input
                                    type="text"
                                    id="phone_number"
                                    name="phone_number"
                                    value={user.phone_number}
                                    onChange={handleChange}
                                    aria-label="Phone Number"
                                    required  // Add required attribute
                                />
                            </div>
                            <div>
                                <label htmlFor="country">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={user.country}
                                    onChange={handleChange}
                                    aria-label="Country"
                                    required  // Add required attribute
                                />
                            </div>
                            <div>
                                <label htmlFor="role">Role</label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={user.role}
                                    onChange={handleChange}
                                    aria-label="Role"
                                    required  // Add required attribute
                                />
                            </div>
                            <button type="submit">Update User</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
