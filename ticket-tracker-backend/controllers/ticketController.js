const Ticket = require("../models/Ticket");

// Create Ticket
exports.createTicket = async (req, res) => {
  const { title, description, status, priority } = req.body;

  const ticket = await Ticket.create({
    user: req.user._id,
    title,
    description,
    status,
    priority,
  });

  res.status(201).json(ticket);
};

// Get My Tickets
exports.getMyTickets = async (req, res) => {
  const tickets = await Ticket.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(tickets);
};

// Update Ticket
exports.updateTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  if (ticket.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  ticket.title = req.body.title || ticket.title;
  ticket.description = req.body.description || ticket.description;
  ticket.status = req.body.status || ticket.status;
  ticket.priority = req.body.priority || ticket.priority;

  const updatedTicket = await ticket.save();
  res.json(updatedTicket);
};

// Delete Ticket
exports.deleteTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  if (ticket.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  await ticket.deleteOne();
  res.json({ message: "Ticket removed" });
};
