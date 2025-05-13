import mongoose from "mongoose";

const coachSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    experience: {
      type: Number,
      required: true,
    },
    expertise: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "coach",
    },
    image: {
      type: String,
      required: false,
    },
    pricing: {
      oneMonth: {
        type: Number,
        required: true,
      },
      threeMonths: {
        type: Number,
        required: true,
      },
      sixMonths: {
        type: Number,
        required: true,
      },
      oneYear: {
        type: Number,
        required: true,
      },
    },
    freeSlots: [
      {
        start: String,
        end: String,
        status: {
          type: String,
          enum: ["available", "consumed"],
          default: "available",
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const coaches = mongoose.model("coaches", coachSchema);

export default coaches;
