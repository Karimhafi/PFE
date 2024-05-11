import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Login.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice'; // Import setUser action
import { clearUser } from '../../store/userSlice'; // Import setUser action

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    clearUser
    dispatch(clearUser);

  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        username,
        password
      });
      console.log(response.data.user.role);
      if(response.status===200){

        setSuccessMessage('Logged in successfully');
      dispatch(setUser({ id: response.data.user.id, username: response.data.user.username, role: response.data.user.role,ison:true }));
      if (response.data.user.role==='user'){navigate("/");}
      else {{navigate("/list-of-users");}

    }}
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const goregister = () => {
    navigate(`/register`);
};
  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login to Your Account</h2>
          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          <div className="form-group">
  <button onClick={goregister} className="re-button"> register </button>
          </div>

          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
