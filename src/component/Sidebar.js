// Sidebar.js
import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import profileImage from './img/haha.jpg';

const Sidebar = () => {
  // Dummy data untuk representasi user yang sedang login
  const loggedInUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  return (
    <div className="sidebar-container">
      <div className="logo-container">
        <div className="logo-image" style={{ backgroundImage: `url(${profileImage})` }}></div>
        <div className="logo-text">SPK</div>
      </div>
      <div className="sidebar-links">
        <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
        <Link to="/managementSPK" className="sidebar-link">Management SPK</Link>
        <Link to="/monitoring" className="sidebar-link">Monitoring</Link>
        {/* Tambahkan menu sesuai kebutuhan */}
      </div>
      <div className="user-info">
        <div className="user-profile-image" style={{ backgroundImage: `url(${profileImage})` }}></div>
        <div className="user-details">
          <hr className="user-divider" />
          <p className="font-bold">{loggedInUser.name}</p>
          <p className="user-email">{loggedInUser.email}</p>
        </div>
      </div>
      <hr className="sidebar-divider" />
    </div>
  );
};

export default Sidebar;
