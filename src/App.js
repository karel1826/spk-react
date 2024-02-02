import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './component/Sidebar.js';
import ManagementSPK from './component/ManagementSPK.js';
import Monitoring from './component/Monitoring.js';
import Login from './component/Login.js';
import Dashboard from './component/Dashboard.js';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setLoggedIn(status);
  };

  return (
        <Router>
          <div style={{ display: 'flex' }}>
            {/* Tambahkan prop isLoggedIn ke Sidebar */}
            <Sidebar isLoggedIn={isLoggedIn} />
            <Routes>
              {/* ... */}
              <Route
                path="/login"
                element={<Login handleLogin={handleLogin} />}
              />
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/managementSPK" element={<ManagementSPK />} />
              <Route path="/monitoring" element={<Monitoring />} />
            </Routes>
          </div>
        </Router>
      );
    };
export default App;
