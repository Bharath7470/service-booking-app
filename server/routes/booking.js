const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create booking
router.post("/add", async (req, res) => {
  try {
    const { userId, serviceId } = req.body;

    const booking = new Booking({
      userId,
      serviceId
    });

    await booking.save();

    res.json({ message: "Booking successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bookings
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

module.exports = router;