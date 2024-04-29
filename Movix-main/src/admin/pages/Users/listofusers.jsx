import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listofusers.scss'; // Import the CSS for styling
import { useNavigate } from 'react-router-dom'; // import useNavigate hook
import EditIcon from '@mui/icons-material/Edit';

import DeleteIcon from '@mui/icons-material/Delete';function UsersTable() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); // Hook to navigate
    const [Message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const hideMessage = () => {
        setIsVisible(false);
    };
    useEffect(() => {
        // Fetch the users from the API
        axios.get('http://localhost:3001/api/users')
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching users', error);
            });
    }, []);
    const handleEditClick = (userId) => {
        navigate(`/edit-user/${userId}`);
    };
    function handleDelete(userId) {
        axios.delete(`http://localhost:3001/api/Delete/${userId}`)
            .then(response => {
                setMessage('User deleted successfully');
                setIsVisible(true);

                // Optionally, refresh the list or navigate away
            })
            .catch(error => {
                setMessage('Failed to delete user');
                setIsVisible(true);

                console.error('Failed to delete user:', error);
            });
    }
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


                                <th>Edit</th>
                                <th>Delete</th>
                                <th>Count of movie</th>
                                        <th>Count of TV</th>

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
                                    <td>
                                        <button onClick={() => handleEditClick(user.id)} className="delete-button"><EditIcon/></button>
                                    </td>
                                    <td>
                                    <button onClick={() => handleDelete(user.id)} className="delete-button" >
    <DeleteIcon />
</button>

                                    </td>
                                    <td>{user.movie_count}</td>
                                    <td>{user.tv_count}</td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {isVisible && (
                <div className="message-container" onClick={hideMessage}>
                    {Message}
                </div>
            )}                </div>
            </div>
        </div>
    );
}

export default UsersTable;
