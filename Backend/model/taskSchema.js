import mongoose from "mongoose";

const singleTaskSchema = new mongoose.Schema({
  taskDetails: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const taskSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  tasks: [singleTaskSchema], 
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86000, 
  },
});

const taskes = mongoose.model("taskes", taskSchema);

export default taskes;
