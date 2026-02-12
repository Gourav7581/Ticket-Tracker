const Ticket = require("../models/Ticket");

// Create Ticket
exports.createTicket = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    const ticket = await Ticket.create({
      user: req.user._id, 
      title,
      description,
      status,
      priority,
    });

    res.status(201).json({
      message: "Ticket created successfully!",
      ticket,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get  Tickets
exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Ticket
exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket)
      return res.status(404).json({ message: "Ticket not found" });

    if (ticket.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    ticket.title = req.body.title || ticket.title;
    ticket.description = req.body.description || ticket.description;
    ticket.status = req.body.status || ticket.status;
    ticket.priority = req.body.priority || ticket.priority;

    const updatedTicket = await ticket.save();

    res.json({
      message: "Ticket updated successfully!",
      ticket: updatedTicket,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Ticket
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket)
      return res.status(404).json({ message: "Ticket not found" });

    if (ticket.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    await ticket.deleteOne();

    res.json({ message: "Ticket removed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
