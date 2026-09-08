import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../Service/BaseUrl";

export const CreateTicket = () => {
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    status: "Open",
    priority: "Medium",
  });

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); 

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BaseUrl}/api/tickets`,
        ticket,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Ticket created:", response.data.ticket);
      setLoading(false);
      navigate("/tickets"); 
    } catch (error) {
      console.error("Error creating ticket:", error.response?.data || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="create-ticket-page">
      {/* Back Button */}
      <button
        className="btn create-back-btn"
        onClick={() => navigate("/tickets")}
      >
        ← Back
      </button>

      {/* Card */}
      <div className="create-ticket-shell">
        <div className="card border-0 create-ticket-card">
          <div className="text-center mb-4">
            <div className="create-ticket-icon" aria-hidden="true">+</div>
            <h3 className="fw-bold mb-1 create-ticket-title">Create New Ticket</h3>
            <p className="text-muted small">Submit your issue and track progress easily</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label small fw-semibold">Ticket Title</label>
              <input
                type="text"
                className="form-control ticket-input"
                placeholder="Eg. Unable to login"
                name="title"
                value={ticket.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label small fw-semibold">Description</label>
              <textarea
                className="form-control ticket-input ticket-textarea"
                rows="4"
                placeholder="Describe your issue in detail..."
                name="description"
                value={ticket.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Status & Priority */}
            <div className="row mb-4">
              <div className="col-md-6 mb-3 mb-md-0">
                <label className="form-label small fw-semibold">Status</label>
                <select
                  className="form-select ticket-input"
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
                <label className="form-label small fw-semibold">Priority</label>
                <select
                  className="form-select ticket-input"
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
            <div className="create-ticket-actions">
              <button
                type="button"
                className="btn btn-outline-secondary ticket-action-btn"
                onClick={() => navigate("/tickets")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn auth-primary-btn ticket-action-btn"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Ticket"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
