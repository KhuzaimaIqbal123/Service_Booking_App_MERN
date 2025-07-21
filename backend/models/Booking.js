import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {  // ✅ Better to use 'user' instead of 'userId' when using populate()
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true
  },
  serviceName: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  bookedAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
