import React, { useState, useEffect } from 'react';
import './Contact.css';
import { useDispatch } from 'react-redux';
import { submitForm, fetchData } from './action/userAction'
import { connect } from 'react-redux';




function Contact({ data, loading, error, fetchData }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  function validationForm() {
    const errors = {};



    if (firstName.trim() === '') {
      errors.firstName = 'First Name cannot be empty';
    }

    if (lastName.trim() === '') {
      errors.lastName = 'Last Name cannot be empty';
    }
    if (mobile.trim() === '') {
      errors.mobile = 'Mobile Number cannot be empty';
    } else if (isNaN(mobile) || mobile.length !== 10) {
      errors.mobile = 'Invalid mobile number';
    }


    if (email.trim() === '') {
      errors.email = 'Email Address cannot be empty';
    } else {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email)) {
        errors.email = 'Invalid email address';
      }
    }

    if (password.length < 8) {
      errors.password = 'Password must contain at least 8 characters.';
    } else {
      let countUpperCase = 0;
      let countLowerCase = 0;
      let countDigit = 0;
      let countSpecialCharacters = 0;

      for (let i = 0; i < password.length; i++) {
        const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '[', '{', ']', '}', ':', ';', '<', '>'];

        if (specialChars.includes(password[i])) {
          countSpecialCharacters++;
        } else if (!isNaN(password[i] * 1)) {
          countDigit++;
        } else {
          if (password[i] === password[i].toUpperCase()) {
            countUpperCase++;
          }
          if (password[i] === password[i].toLowerCase()) {
            countLowerCase++;
          }
        }
      }

      if (countLowerCase === 0 || countUpperCase === 0 || countDigit === 0 || countSpecialCharacters === 0) {
        errors.password = 'Password must meet the requirements.';
      }
    }

    if (!/^\d{2}$/.test(age)) {
      errors.age = 'Age must be a 2-digit number.';
    } else {
      const ageValue = parseInt(age, 10);
      if (ageValue < 18) {
        errors.age = 'Age must be 18 or older.';
      }
    }

    if (isNaN(mobile) || mobile.length !== 10) {
      errors.mobile = 'Invalid mobile number.';
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
    } else {
      setErrorMessages({});
      // sendFormData();
    }

  }


  function sendFormData() {
    const data = {
      firstName,
      lastName,
      mobile,
      age,
      email,
      password,
    };

    dispatch(submitForm(data))
      .then((response) => {
        console.log('Form submitted successfully', response);
        localStorage.setItem('formData', JSON.stringify(data));
        window.location.href = '/services';
        alert('Form submitted successfully');
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  }


  //   axios
  //     .post('http://localhost:3001/users/createUser', data)
  //     .then(response => {
  //       localStorage.setItem('formData', JSON.stringify(data));
  //       window.location.href = '/services';
  //       setSubmittedData(data);


  //       alert('Form submitted successfully');
  //     })
  //     .catch(error => {
  //       console.error('Error submitting form:', submittedData);
  //     });
  // }

  return (
    <>
      <div className="main">
        <form>
          <label>Select an option:</label>
          <select value={selectedValue} 
          onChange={handleSelectChange}>
            <option value="">Select an option</option>
            {data && data.map((item) => (
              <option key={item._id} value={item._id}>
                {`${item.firstName} ${item.lastName}`}
                
              </option>
              
            ))}
          </select>
          <input
            placeholder="First Name"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errorMessages.firstName && <span>{errorMessages.firstName}</span>}
          <br />
          <input
            placeholder="Last Name"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
          {errorMessages.lastName && <span>{errorMessages.lastName}</span>}
          <br />
          <input
            placeholder="Mobile Number"
            type="text"
            maxLength={10}
            onChange={(e) => setMobile(e.target.value)}
          />
          {errorMessages.mobile && <span>{errorMessages.mobile}</span>}
          <br />
          <input
            placeholder="Age"
            type="Number"
            maxLength={2}
            onChange={(e) => setAge(e.target.value)}
          />
          {errorMessages.age && <span>{errorMessages.age}</span>}
          <br />
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMessages.email && <span>{errorMessages.email}</span>}
          <br />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessages.password && <span>{errorMessages.password}</span>}

          <br />
          <button
            type="button"
            onClick={() => {
              validationForm()
              sendFormData();
            }}
          >
            Submit
          </button>
        </form>

      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  data: state.data.data,
  loading: state.data.loading,
  error: state.data.error,
});

export default connect(mapStateToProps, { fetchData })(Contact);