import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../Service/BaseUrl";

export const TicketList = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editTicket, setEditTicket] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // for update success

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/tickets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTickets(response.data.tickets);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token]);

  const priorityColor = (priority) => {
    if (priority === "High") return "bg-danger";
    if (priority === "Medium") return "bg-primary";
    return "bg-secondary";
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // redirect to login page
  };

  // Delete ticket
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      await axios.delete(`${BaseUrl}/api/tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets((prev) => prev.filter((ticket) => ticket._id !== id));
    } catch (error) {
      console.error("Error deleting ticket:", error.response?.data || error.message);
    }
  };

  // Open edit modal
  const openEditModal = (ticket) => {
    setEditTicket(ticket);
  };

  // Handle form changes in modal
  const handleEditChange = (e) => {
    setEditTicket({ ...editTicket, [e.target.name]: e.target.value });
  };

  // Submit edited ticket
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);

    try {
      const { data } = await axios.put(
        `${BaseUrl}/api/tickets/${editTicket._id}`,
        {
          title: editTicket.title,
          description: editTicket.description,
          status: editTicket.status,
          priority: editTicket.priority,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTickets((prev) =>
        prev.map((t) => (t._id === data.ticket._id ? data.ticket : t))
      );

      setEditTicket(null);
      setSuccessMessage("Ticket updated successfully!");
      setTimeout(() => setSuccessMessage(""), 2500);
    } catch (error) {
      console.error("Error updating ticket:", error.response?.data || error.message);
    }
    setEditLoading(false);
  };

  if (loading) return <div className="text-center mt-5">Loading tickets...</div>;

  return (
    <div
      className="min-vh-100"
      style={{ background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)", padding: "30px" }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 px-4 py-3 shadow-sm" style={{ background: "white", borderRadius: "14px" }}>
        <div>
          <h4 className="fw-bold mb-0">🎫 My Tickets</h4>
          <small className="text-muted">Track and manage your requests</small>
        </div>
        <div>
          <button
            className="btn text-white fw-semibold me-2 px-4 py-2 shadow-sm"
            style={{ background: "linear-gradient(135deg, #667eea, #764ba2)", borderRadius: "20px", border: "none" }}
            onClick={() => navigate("/create-ticket")}
          >
            + Create Ticket
          </button>
          <button
            className="btn btn-outline-danger fw-semibold px-4 py-2 shadow-sm"
            style={{ borderRadius: "20px", border: "none" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success text-center py-2">{successMessage}</div>
      )}

      {/* Cards */}
      <div className="row g-4">
        {tickets.length === 0 ? (
          <div className="col-12 d-flex justify-content-center mt-5">
            <div
              className="card shadow-sm text-center p-4"
              style={{ borderRadius: "18px", maxWidth: "400px", background: "#ffffff" }}
            >
              <h5 className="mb-2">🎉 No tickets found!</h5>
              <p className="text-muted mb-3">You haven't created any tickets yet. Click below to create one.</p>
              <button
                className="btn text-white fw-semibold px-4 py-2"
                style={{ background: "linear-gradient(135deg, #667eea, #764ba2)", borderRadius: "20px", border: "none" }}
                onClick={() => navigate("/create-ticket")}
              >
                + Create Ticket
              </button>
            </div>
          </div>
        ) : (
          tickets.map((ticket) => (
            <div className="col-xl-3 col-lg-4 col-md-6" key={ticket._id}>
              <div
                className="card border-0 shadow-sm h-100"
                style={{ borderRadius: "16px", transition: "0.3s", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div
                  className="px-3 py-2 text-white"
                  style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px", background: "linear-gradient(135deg, #43cea2, #185a9d)", fontSize: "12px" }}
                >
                  {ticket.status}
                </div>

                <div className="card-body">
                  <h6 className="fw-bold mb-2">{ticket.title}</h6>
                  <p className="text-muted mb-3" style={{ fontSize: "13px" }}>
                    {ticket.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className={`badge ${priorityColor(ticket.priority)}`} style={{ fontSize: "11px" }}>
                      {ticket.priority} Priority
                    </span>

                    <div>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openEditModal(ticket)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(ticket._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editTicket && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Ticket</h5>
                <button type="button" className="btn-close" onClick={() => setEditTicket(null)}></button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" value={editTicket.title} onChange={handleEditChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" value={editTicket.description} onChange={handleEditChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" name="status" value={editTicket.status} onChange={handleEditChange}>
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Closed</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select className="form-select" name="priority" value={editTicket.priority} onChange={handleEditChange}>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setEditTicket(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={editLoading}>
                    {editLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
