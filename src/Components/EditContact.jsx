import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateUser } from './action/userAction';

function EditContact() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    age: '',
    email: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (id) {
      fetchUserDataById(id);
    }
  }, [id]);

  const fetchUserDataById = (userId) => {
    axios
      .get(`http://localhost:3001/users/getUserById/${userId}`)
      .then((response) => {
        if (response && response.data) {
          setFormData(response.data);
        } else {
          console.error('Invalid response:', response);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (formData.firstName.trim() === '') {
      errors.firstName = 'First name is required';
    }

    if (formData.lastName.trim() === '') {
      errors.lastName = 'Last name is required';
    }

    if (formData.mobile.trim() === '') {
      errors.mobile = 'Mobile is required';
    }

    if (formData.email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email address';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        await dispatch(updateUser(id, formData));
        navigate('/Services');
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Edit Contact</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {validationErrors.firstName && (
            <span className="error">{validationErrors.firstName}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {validationErrors.lastName && (
            <span className="error">{validationErrors.lastName}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            className="form-control"
            id="mobile"
            maxLength={10}
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
          />
          {validationErrors.mobile && (
            <span className="error">{validationErrors.mobile}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="age"
            maxLength={2}
            value={formData.age}
            onChange={handleInputChange}
          />
          {validationErrors.age && (
            <span className="error">{validationErrors.age}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {validationErrors.email && (
            <span className="error">{validationErrors.email}</span>
          )}
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/Services')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditContact;
