import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../Service/BaseUrl";

export const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${BaseUrl}/api/auth/register`, {
        name,
        email,
        password,
      });

      setSuccess("Account created successfully 🎉");
      setTimeout(() => navigate("/tickets"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)" }}
    >
      <div className="card shadow-lg rounded-5 p-5" style={{ width: "420px" }}>
        <h2
          className="text-center mb-2 fw-bold"
          style={{ color: "#1f2a38", fontSize: "24px" }}
        >
          Create Account
        </h2>
        <p className="text-center text-muted mb-4" style={{ fontSize: "14px" }}>
          Sign up to manage your tickets
        </p>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}

        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control rounded-pill border-0 shadow-sm"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div className="mb-3">
            <input
              type="password"
              className="form-control rounded-pill border-0 shadow-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control rounded-pill border-0 shadow-sm"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-muted" style={{ fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            className="text-primary fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};
