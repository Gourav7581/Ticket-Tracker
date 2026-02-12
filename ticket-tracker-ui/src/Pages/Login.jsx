import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../Service/BaseUrl";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${BaseUrl}/api/auth/login`, { email, password });
      console.log(data);
      navigate("/tickets");
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : "Something went wrong!"
      );
    }

    setLoading(false);
  };

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)" }}
    >
      <div className="card shadow-lg rounded-5 p-5" style={{ width: "420px" }}>
        <h2 className="text-center mb-3 fw-bold" style={{ color: "#1f2a38", fontSize: "24px" }}>
          Ticket Tracker
        </h2>
        <p className="text-center text-muted mb-4" style={{ fontSize: "14px" }}>
          Login to manage your tickets
        </p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control rounded-pill border-0 shadow-sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control rounded-pill border-0 shadow-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill shadow"
            style={{
              padding: "10px",
              fontSize: "16px",
              background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
              border: "none",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-muted" style={{ fontSize: "14px" }}>
          Don't have an account?{" "}
          <span
            className="text-primary fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};
