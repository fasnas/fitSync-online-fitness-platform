import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coaches",
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    slot: {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
    validity: {
      start: { type: Date },
      end: { type: Date },
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    paymentDetails: {
      amount: { type: Number, required: true, min: 0 },
      razorpay_order_id: { type: String },
      razorpay_payment_id: { type: String },
      razorpay_signature: { type: String },
      status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
      },
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;