import React from "react";

function TicketList() {
  return (
    <div className="container mt-4">
      <h3 className="mb-3">My Tickets</h3>

      <button className="btn btn-success mb-3">+ Create Ticket</button>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Login issue</td>
            <td><span className="badge bg-warning">Open</span></td>
            <td>High</td>
            <td>
              <button className="btn btn-sm btn-primary me-2">Edit</button>
              <button className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TicketList;
