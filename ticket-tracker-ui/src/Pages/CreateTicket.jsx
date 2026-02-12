import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateTicket = () => {
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    status: "Open",
    priority: "Medium",
  });

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(ticket);
    navigate("/tickets");
  };

  return (
    <div
      className="min-vh-100 position-relative"
      style={{
        background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
        padding: "30px",
      }}
    >
      {/* Back Button – Outside Card */}
      <button
        className="btn btn-light rounded-pill shadow-sm px-3"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
        onClick={() => navigate("/tickets")}
      >
        ← Back
      </button>

      {/* Center Card */}
      <div className="d-flex align-items-center justify-content-center h-100">
        <div
          className="card border-0 shadow-lg p-5"
          style={{ width: "520px", borderRadius: "22px" }}
        >
          {/* Header */}
          <div className="text-center mb-4">
            <h3 className="fw-bold mb-1">🎫 Create New Ticket</h3>
            <p className="text-muted small">
              Submit your issue and track progress easily
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label small fw-semibold">
                Ticket Title
              </label>
              <input
                type="text"
                className="form-control rounded-pill shadow-sm"
                placeholder="Eg. Unable to login"
                name="title"
                value={ticket.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label small fw-semibold">
                Description
              </label>
              <textarea
                className="form-control shadow-sm"
                rows="4"
                placeholder="Describe your issue in detail..."
                name="description"
                value={ticket.description}
                onChange={handleChange}
                style={{ borderRadius: "14px" }}
                required
              ></textarea>
            </div>

            {/* Status & Priority */}
            <div className="row mb-4">
              <div className="col-md-6 mb-3 mb-md-0">
                <label className="form-label small fw-semibold">
                  Status
                </label>
                <select
                  className="form-select rounded-pill shadow-sm"
                  name="status"
                  value={ticket.status}
                  onChange={handleChange}
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Closed</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">
                  Priority
                </label>
                <select
                  className="form-select rounded-pill shadow-sm"
                  name="priority"
                  value={ticket.priority}
                  onChange={handleChange}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={() => navigate("/tickets")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn text-white rounded-pill px-5 shadow"
                style={{
                  background:
                    "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                  border: "none",
                }}
              >
                Create Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
