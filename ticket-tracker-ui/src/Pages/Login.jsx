import React from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Abhi dummy login — baad me API connect karenge
    navigate("/tickets");
  };

  return (
    <div className="bg-light vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow p-4" style={{ width: "420px" }}>
        <h3 className="text-center mb-2">Ticket Tracker</h3>
        <p className="text-center text-muted mb-4">
          Login to manage your tickets
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" required />
          </div>

          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

