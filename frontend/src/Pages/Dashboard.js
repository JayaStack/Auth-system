import React from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="user-card">
          <h2>Your Profile</h2>
          <div className="user-info">
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Role:</strong>{" "}
              <span className={`badge badge-${user?.role}`}>{user?.role}</span>
            </p>
            <p>
              <strong>Email Verified:</strong>{" "}
              {user?.isEmailVerified ? "✓ Yes" : "✗ No"}
            </p>
            <p>
              <strong>Member Since:</strong>{" "}
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {user?.role === "admin" && (
          <div className="admin-card">
            <h2>Admin Panel</h2>
            <p>You have admin access to manage users and system settings.</p>
            <a href="/admin" className="btn btn-primary">
              Go to Admin Dashboard
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
