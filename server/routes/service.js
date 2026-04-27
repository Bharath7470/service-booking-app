const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

// Add service
router.post("/add", async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.json({ message: "Service added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all services
router.get("/", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

module.exports = router;