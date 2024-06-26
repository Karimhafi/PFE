import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listofusers.scss'; // Make sure the CSS file is correctly linked
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function UsersTable() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleEditClick = (userId) => {
        navigate(`/edit-user/${userId}`);
    };

    const handleDelete = (userId) => {
        axios.delete(`http://localhost:3001/api/delete/${userId}`)
            .then(response => {
                setMessage('User deleted successfully');
                setUsers(users.filter(user => user.id !== userId)); // Optimistically remove the user from the UI
                setIsVisible(true);
                setTimeout(() => setIsVisible(false), 5000); // Hide the message after 5 seconds
            })
            .catch(error => {
                setMessage('Failed to delete user');
                setIsVisible(true);
                setTimeout(() => setIsVisible(false), 5000);
                console.error('Failed to delete user:', error);
            });
    };

    return (
        <div className="users-table-page">
            <div className="table-container">
                <h2 className="table-title">List of Users</h2>
                <div className="table-responsive"> {/* Wrapper for responsive table */}
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Phone Number</th>
                                <th>Role</th>
                                <th>Country</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>Count of Movies</th>
                                <th>Count of TV Shows</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.phone_number || "empty"}</td>
                                    <td>{user.role}</td>
                                    <td>{user.country || "empty"}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(user.id)} className="edit-button"><EditIcon/></button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(user.id)} className="delete-button">
                                            <DeleteIcon />
                                        </button>
                                    </td>
                                    <td>{user.movie_count}</td>
                                    <td>{user.tv_count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {isVisible && (
                    <div className="message-container">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UsersTable;
