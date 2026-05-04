const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

// Add service
router.post("/add", async (req, res) => {
  const service = new Service(req.body);
  await service.save();
  res.json({ message: "Service added" });
});

// Get all services
router.get("/", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

module.exports = router;