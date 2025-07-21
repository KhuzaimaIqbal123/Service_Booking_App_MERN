import express from "express";
import Booking from "../models/Booking.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const { serviceName, price } = req.body;
    if (!serviceName || !price)
      return res.status(400).json({ message: "Service Name & Price required" });

    const newBooking = new Booking({
      user: req.user.userId,  // Taken from token middleware
      serviceName,
      price
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking successful", booking: newBooking });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId }).sort({ bookedAt: -1 });
    res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});


export default router;
