process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

require("dotenv").config();

console.log("✓ Starting server...");
console.log("✓ PORT:", process.env.PORT || 5000);
console.log("✓ MONGO_URI exists:", !!process.env.MONGO_URI);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("Bike Rental API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✓ MongoDB connected");

    // Load routes after DB connection
    const authRoutes = require("./routes/auth.routes");
    const bikesRoutes = require("./routes/bikes.routes");
    const bookingRoutes = require("./routes/booking.routes");
    const adminRoutes = require("./routes/admin.routes");

    app.use("/api/auth", authRoutes);
    app.use("/api/bikes", bikesRoutes);
    app.use("/api/bookings", bookingRoutes);
    app.use("/api/admin", adminRoutes);
    console.log("✓ All routes loaded");
  })
  .catch((err) => {
    console.error("✗ MongoDB error:", err.message);
  });
