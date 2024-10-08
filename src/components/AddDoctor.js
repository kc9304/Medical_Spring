import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logo from './logo.jpg'; // Make sure to import your logo
import './reg.css';

const AddDoctor = () => {
  const username = localStorage.getItem("un");

  // State to hold doctor data
  const [doctorData, setDoctorData] = useState({
    name: '',
    age: '',
    specialization: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setDoctorData((prevData) => ({
      ...prevData,
      [id]: value, // Use the input ID as the key
    }));
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8080/registerdoc", {
        name: doctorData.name,
        age: doctorData.age,
        specialization: doctorData.specialization,
        email: doctorData.email,
        phoneNumber: doctorData.phoneNumber,
        password: doctorData.password,
      });

      console.log(response.data);
      if (response.data === "Success") {
        alert("Successfully Registered! Please Login.");
      } else {
        alert("Failed to register");
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="body">
      {/* Navbar */}
      <div className="navbar" style={{ backgroundColor: 'skyblue', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px' }}>
        
        {/* Logo and Name */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ width: '50px', height: '50px', cursor: 'pointer' }} src={Logo} alt='Logo' />
          <h1 style={{ marginLeft: '10px', fontSize: '2vw' }}>
            <span style={{ color: 'white' }}>MEDI</span>
            <span style={{ color: 'darkblue' }}>SYNC</span>
          </h1>
        </div>
        
        {/* Logout Link */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/log" className="nav-link">
            <h3>Logout</h3>
          </Link>
        </div>
      </div>
      <div style={{
        textAlign: 'right',
        marginRight: '20px',
        fontSize: '0.8vw', 
        color: 'darkblue',
        fontWeight: '600',
        padding: '10px 20px',
        borderRadius: '10px'
      }}>
        <h2>Welcome, {username}!</h2>
      </div>

      <div className="main">
        <div className="login-page1">
          <h3>REGISTER DOCTOR</h3>

          {/* Name Input */}
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            value={doctorData.name}
            onChange={handleChange}
            required
          />

          {/* Age Input */}
          <input
            type="number"
            id="age"
            placeholder="Enter Age"
            value={doctorData.age}
            onChange={handleChange}
            required
          />

          {/* Specialization Input */}
          <input
            type="text"
            id="specialization"
            placeholder="Enter Specialization"
            value={doctorData.specialization}
            onChange={handleChange}
            required
          />

          {/* Email Input */}
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={doctorData.email}
            onChange={handleChange}
            required
          />

          {/* Phone Number Input */}
          <input
            type="tel"
            id="phoneNumber"
            placeholder="Enter Phone Number"
            value={doctorData.phoneNumber}
            onChange={handleChange}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={doctorData.password}
            onChange={handleChange}
            required
          />

          {/* Register Button */}
          <button onClick={handleRegister}>
            Register
          </button>

        
        </div>
      </div>

      {/* Welcome Admin Message */}
      
      {/* Footer */}
      <footer style={{ backgroundColor: 'skyblue', color: 'white', padding: '20px', marginTop: '20vh', textAlign: 'center' }}>
        <p style={{ fontSize: '1.2vw' }}>© 2024 MediSync. All rights reserved.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
          <Link to="/terms" style={{ color: 'white', textDecoration: 'none' }}>Terms & Conditions</Link>
          <Link to="/privacy" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</Link>
        </div>
      </footer>
    </div>
  );
};

export default AddDoctor;
