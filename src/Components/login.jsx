import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/users/login', {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        console.log('Login successful:', data);
        localStorage.setItem('accessToken', data.user.token);
        setIsLoggedIn(true);
        alert('Login successful!');

        setEmail('');
        setPassword('');
        navigate('/');
        window.location.href = '/home';
      } else {
        console.error('Login failed:', data.message);
        setError('Email or password is incorrect');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setError('Error during login. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
