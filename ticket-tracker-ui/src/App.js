import React from "react";

function App() {
  return (
    <div className="bg-light vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow p-4" style={{ width: "420px", borderRadius: "10px" }}>
        
        <h3 className="text-center mb-2">Ticket Tracker</h3>
        <p className="text-center text-muted mb-4" style={{ fontSize: "14px" }}>
          Login to manage your tickets
        </p>

        <form>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Don't have an account? Register
          </small>
        </div>

      </div>
    </div>
  );
}

export default App;
