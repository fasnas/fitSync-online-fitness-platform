import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      // enum:[]
    },
    phone: Number,
    age: Number,
    height: Number,
    weight: Number,
    bmi: Number,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    profilePhoto: {
      type: String,
    },
    tdee: { type: Number },
    waterIntake: { type: Number },
    recommendedSteps: { type: Number },
  },
  { timestamps: true }
);
const users = mongoose.model("users", userSchema);

export default users;
