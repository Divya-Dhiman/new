import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
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
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
{error && <p className="error-message">{error}</p>} 
        <button type="submit">Login</button>
      </form>

      
    </div>
  );
};

export default Login;
