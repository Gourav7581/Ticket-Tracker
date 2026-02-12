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

    console.log(ticket); // Abhi backend connect nahi hai

    // After create redirect to list page
    navigate("/tickets");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="mb-4">Create New Ticket</h3>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={ticket.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="4"
              name="description"
              value={ticket.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Status */}
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={ticket.status}
              onChange={handleChange}
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Closed</option>
            </select>
          </div>

          {/* Priority */}
          <div className="mb-4">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              name="priority"
              value={ticket.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Create Ticket
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/tickets")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

