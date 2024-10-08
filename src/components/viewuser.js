import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from './logo.jpg'; // Assuming the logo path is the same

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const username = localStorage.getItem("un");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = (email) => {
    axios.delete("http://localhost:8080/deleteUser", {
      params: {
        email: email,
      },
    })
    .then((response) => {
      alert(response.data);
      setUsers(users.filter((user) => user.email !== email)); // Remove deleted user from list
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
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

      {/* Users Table */}
      <div
        className="users-table-container"
        style={{
          margin: '40px auto',
          padding: '20px',
          maxWidth: '80%',
          backgroundColor: '#f9f9f9',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'darkblue' }}>
          User Information
        </h2>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '1.1vw',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: 'skyblue', color: 'white' }}>
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Role</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Email</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Password</th>
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}
              >
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{user.name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{user.role}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{user.email}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{user.password}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <button
                    onClick={() => deleteUser(user.email)}
                    style={{
                      backgroundColor: 'skyblue',
                      color: 'white',
                      border: 'none',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderRadius: '5px',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default ViewUsers;
