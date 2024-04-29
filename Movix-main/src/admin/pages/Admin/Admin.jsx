import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.scss'; // Import the CSS for styling

function Admintable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch the users from the API
        axios.get('http://localhost:3001/api/Admin')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users', error);
            });
    }, []);

    return (
        <div className="users-table-page">
            <div className="table-container">
                <h2 className="table-title">List of Users</h2> {/* Title for the users table */}
                <div className="usersTableWrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Phone Number</th> {/* Fixed typo in heading */}
                                <th>Role</th>
                                <th>Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.Phone_number || "empty"}</td>
                                    <td>{user.role}</td>
                                    <td>{user.Country || "empty"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Admintable;
