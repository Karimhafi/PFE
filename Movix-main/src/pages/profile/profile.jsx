import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import defaultAvatar from '../../assets/avatar.png';
import './profile.scss';

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user); // Access user data from the Redux store
    const [newUsername, setNewUsername] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [newCountry, setNewCountry] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [IsLoading, setIsLoading] = useState(false);



    const handleUpdate = async () => {
      if (!newUsername || !newPhoneNumber || !newCountry) {
          setErrorMessage('All fields are required');
          return;
      }
      setIsLoading(true);
      try {
          const response = await fetch(`http://localhost:3001/api/users/update/${user.id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  username: newUsername,
                  phone_number: newPhoneNumber,
                  country: newCountry
              }),
          });

          if (response.ok) {
              setSuccessMessage('Profile updated successfully.');
              setNewUsername(''); // Optionally reset username as well
              setNewPhoneNumber('');
              setNewCountry('');
              setErrorMessage('');
          } else {
              setErrorMessage('Failed to update profile');
          }
      } catch (error) {
          console.error('Error updating profile:', error);
          setErrorMessage('Failed to update profile');
      }
      setIsLoading(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="login-container">
          <h2>Profile</h2>




          <div className="form-group">
            <label>New Username:</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Country:</label>
            <input
              type="text"
              value={newCountry}
              onChange={(e) => setNewCountry(e.target.value)}
            />
          </div>
          <button onClick={handleUpdate}>Update Profile</button>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
}

export default Profile;
