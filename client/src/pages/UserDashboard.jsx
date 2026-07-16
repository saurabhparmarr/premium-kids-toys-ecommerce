import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Link to="/profile" className="p-8 border rounded-xl bg-gray-50 hover:bg-gray-100">
        <h2 className="text-xl font-bold">Profile Settings</h2>
      </Link>
      <Link to="/orders" className="p-8 border rounded-xl bg-gray-50 hover:bg-gray-100">
        <h2 className="text-xl font-bold">My Orders</h2>
      </Link>
    </div>
  </div>
);
export default UserDashboard;