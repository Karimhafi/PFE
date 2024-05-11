import React, { useState } from 'react';
import axios from 'axios';
import './Register.scss'; // Make sure the SCSS file is named and imported correctly
import Spinner from '../../components/spinner/Spinner';
import { useNavigate, useLocation } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setdone] = useState('');
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== password2) {
      setError("Passwords do not match.");
      return;  // Stop the submission if the passwords don't match
    }

    setError('');  // Clear any existing errors
    setLoading(true);  // Set loading to true to show a loading indicator

    try {
      const response = await axios.post('http://localhost:3001/api/users/register', {
        username,
        password
      });
if (response.status==200)  {     // Redirect or handle additional logic here
      setLoading(false);
       setdone('Registration successful');}
       else {      setError('Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.response.data.message || 'Failed to register. Please try again.');
      setLoading(false);  // Ensure loading is set to false on error as well
    }
  };
  const gologin = () => {
    navigate(`/login`);
};

  return (
    <div className="login-page">
      {loading && <Spinner />}
      {!loading && ( // Only display the form if not logged in
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm your password" value={password2} onChange={e => setPassword2(e.target.value)} required />
            </div>
            <button type="submit" className="login-button" style={{marginBottom:5}}>Register</button>

            {error && <div className="error-message">{error}</div>}
            {done && <div className="done-message">{done}</div>}          </form>

            <button onClick={gologin} className="login-button">Login</button>

        </div>

      )}

      {loading && <div className="done-message">{done}</div>}
    </div>

);
}

export default Register;
