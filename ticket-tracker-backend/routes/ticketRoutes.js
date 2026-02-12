const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createTicket,
  getMyTickets,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");

const router = express.Router();

router.route("/")
  .post(protect, createTicket)
  .get(protect, getMyTickets);

router.route("/:id")
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

module.exports = router;
