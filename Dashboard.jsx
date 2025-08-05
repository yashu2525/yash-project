import React, { useEffect, useState } from 'react';
import { getMenuItems } from '../services/menuService.js';

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getMenuItems().then(data => setMenuItems(data));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Welcome to the Dashboard</h2>
      <div className="row justify-content-center">
        {menuItems.map((item, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h4 className="card-title">{item.icon}</h4>
                <p className="card-text fw-bold">{item.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
