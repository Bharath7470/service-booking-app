const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// POST
router.post("/add", async (req, res) => {
  try {
    const { userId, serviceId } = req.body;

    const booking = new Booking({ userId, serviceId });
    await booking.save();

    res.json({ message: "Booking successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId")
      .populate("serviceId");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;