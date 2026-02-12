import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../Service/BaseUrl";

export const TicketList = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to get JWT token from localStorage (assume token is stored on login)
  const token = localStorage.getItem("token"); // ya jo tum store karte ho

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/api/tickets`, // backend route
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTickets(response.data.tickets); // set tickets from API
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

  if (loading) {
    return <div className="text-center mt-5">Loading tickets...</div>;
  }

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        padding: "30px",
      }}
    >
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center mb-4 px-4 py-3 shadow-sm"
        style={{
          background: "white",
          borderRadius: "14px",
        }}
      >
        <div>
          <h4 className="fw-bold mb-0">🎫 My Tickets</h4>
          <small className="text-muted">Track and manage your requests</small>
        </div>

        <button
          className="btn text-white fw-semibold px-4 py-2 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            borderRadius: "20px",
            border: "none",
          }}
          onClick={() => navigate("/create-ticket")}
        >
          + Create Ticket
        </button>
      </div>

      {/* Cards */}
      <div className="row g-4">
        {tickets.length === 0 ? (
          <div className="text-center mt-5">No tickets found</div>
        ) : (
          tickets.map((ticket) => (
            <div className="col-xl-3 col-lg-4 col-md-6" key={ticket._id}>
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "16px",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div
                  className="px-3 py-2 text-white"
                  style={{
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    background: "linear-gradient(135deg, #43cea2, #185a9d)",
                    fontSize: "12px",
                  }}
                >
                  {ticket.status}
                </div>

                <div className="card-body">
                  <h6 className="fw-bold mb-2">{ticket.title}</h6>
                  <p className="text-muted mb-3" style={{ fontSize: "13px" }}>
                    {ticket.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <span
                      className={`badge ${priorityColor(ticket.priority)}`}
                      style={{ fontSize: "11px" }}
                    >
                      {ticket.priority} Priority
                    </span>

                    <div>
                      <button className="btn btn-sm btn-outline-primary me-2">
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
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
    </div>
  );
};
