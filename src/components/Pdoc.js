import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from './logo.jpg'; // Assuming the logo path is the same

const Pdoc = () => {
  const [doctors, setDoctors] = useState([]);
  const username = localStorage.getItem("un");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const deleteDoctor = (email) => {
    axios.delete("http://localhost:8080/deleteDoctor", {
      params: {
        email: email,
      },
    })
    .then((response) => {
      alert(response.data);
      setDoctors(doctors.filter((doctor) => doctor.email !== email)); // Remove deleted doctor from list
    })
    .catch((error) => {
      console.error("Error deleting doctor:", error);
    });
  };

  return (
    <div className="body">
      {/* Admin Page Navbar */}
      <div
        className="navbar"
        style={{
          backgroundColor: 'skyblue',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
        }}
      >
        {/* Logo and Name */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            style={{ width: '50px', height: '50px', cursor: 'pointer' }}
            src={Logo}
            alt='Logo'
          />
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
      <div
        style={{
          textAlign: 'right',
          marginRight: '20px',
          fontSize: '0.8vw',
          color: 'darkblue',
          fontWeight: '600',
          padding: '10px 20px',
          borderRadius: '10px',
        }}
      >
        <h2>Welcome, {username}!</h2>
      </div>

      {/* Doctor Cards */}
      <div
        className="doctor-cards-container"
        style={{
          margin: '40px auto',
          padding: '20px',
          maxWidth: '80%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'darkblue' }}>
          Doctor Information
        </h2>
        {doctors.map((doctor, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              margin: '10px',
              width: 'calc(30% - 20px)', // Adjust width for three columns with margin
              backgroundColor: '#f9f9f9',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ color: 'darkblue' }}>{doctor.name}</h3>
            <p><strong>Age:</strong> {doctor.age}</p>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Email:</strong> {doctor.email}</p>
            <p><strong>Phone Number:</strong> {doctor.phoneNumber}</p>
            <button
              onClick={() => deleteDoctor(doctor.email)}
              style={{
                backgroundColor: 'skyblue',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: 'skyblue',
          color: 'white',
          padding: '20px',
          marginTop: '40vh',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '1.2vw' }}>© 2024 MediSync. All rights reserved.</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '10px',
          }}
        >
          <Link to="/terms" style={{ color: 'white', textDecoration: 'none' }}>
            Terms & Conditions
          </Link>
          <Link to="/privacy" style={{ color: 'white', textDecoration: 'none' }}>
            Privacy Policy
          </Link>
          <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>
            Contact Us
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Pdoc;
