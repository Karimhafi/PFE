import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './edit.scss'; // Ensure this import path matches where your SCSS file is located

function EditUser() {
    const [user, setUser] = useState({
        username: '',
        password: '',
        phone_number: '',
        country: '',
        role: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the user data from the API
        axios.get(`http://localhost:3001/api/users/${id}`)
            .then(response => {
                setUser(response.data);  // Assuming the API returns the user object directly
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the user data to the API for updating
        axios.put(`http://localhost:3001/api/update/${id}`, user)
            .then(response => {
                console.log('User updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

    return (
        <div className="edit-table-page">

        <div className="edit-user-form">
            <contentWrapper>
                    <div className=" table-container">


            <h1>Edit User</h1>
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
                    />
                </div>
                <div>
                    <label htmlFor="Phone_number">Phone Number</label>
                    <input
                        type="text"
                        id="Phone_number"
                        name="Phone_number"
                        value={user.phone_number}
                        onChange={handleChange}
                        aria-label="Phone Number"
                    />
                </div>
                <div>
                    <label htmlFor="Country">Country</label>
                    <input
                        type="text"
                        id="Country"
                        name="Country"
                        value={user.country}
                        onChange={handleChange}
                        aria-label="Country"
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
                    />
                </div>
                <button type="submit">Update User</button>
            </form>
        </div>    </contentWrapper>    </div></div>

    );
}

export default EditUser;
