const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User"); // <-- added

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is running");
});

// <-- add here
app.get("/test-user", async (req, res) => {
  const user = new User({
    name: "Test User",
    email: "test@gmail.com",
    password: "123456"
  });

  await user.save();
  res.send("User saved");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

const authRoutes = require("./routes/auth");
const serviceRoutes = require("./routes/service");
const bookingRoutes = require("./routes/booking");

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);