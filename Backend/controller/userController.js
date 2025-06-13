import mongoose from "mongoose";
import users from "../model/userSchema.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import Booking from "../model/bookingSchema.js";
import coaches from "../model/coachSchema.js";
import taskes from "../model/taskSchema.js";
import { otpStore } from "../utils/otpStore.js";
import { sendOTP } from "../utils/sendmail.js";

export const userRegister = asyncHandler(async (req, res) => {
  const { name, username, email, phone, password, role } = req.body;

  const existUser = await users.findOne({ email });
  if (existUser) {
    return res.status(400).json({
      success: false,
      message: "email already exist. Please use another email",
    });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new users({
    name,
    username,
    email,
    phone,
    password: hashedPassword,
    role,
  });

  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "Registered successfully",
  });
});

export const getAllApprovedCoaches = asyncHandler(async (req, res) => {
  const coach = await coaches.find({ status: "approved" }).select("-password");
  res.status(200).json({ success: true, coach });
});

export const getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate(
    "coach",
    "name expertise image experience "
  );
  res.status(200).json({
    success: true,
    data: bookings,
  });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await users.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({
    success: true,
    message: "Profile retrieved successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      phone: user.phone,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
      bmi: user.bmi,
      tdee: user.tdee,
      waterIntakeLiters: user.waterIntake,
      recommendedSteps: user.recommendedSteps,
    },
  });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const { age, height, weight, gender, phone } = req.body;

  const user = await users.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  user.age = age ?? user.age;
  user.height = height ?? user.height;
  user.weight = weight ?? user.weight;
  user.gender = gender ?? user.gender;
  user.phone = phone ?? user.phone;

  if (user.height && user.weight) {
    const heightInMeters = user.height / 100;
    user.bmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(2);
  }

  const updatedUser = await user.save();
  res.status(200).json({
    success: true,
    message: "Profile updated",
    user: updatedUser,
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await users.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const isMatch = await comparePassword(currentPassword, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Incorrect current password" });
  }

  user.password = await hashPassword(newPassword);

  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
});

export const calculateHealthStats = async (req, res) => {
  try {
    const { height, weight, age, gender, activity } = req.body;

    const user = await users.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Convert values to numbers
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseInt(age);
    const act = parseFloat(activity);

    if (!h || !w || !a || !gender || !act) {
      return res.status(400).json({
        success: false,
        message: "All fields are required and must be valid numbers",
      });
    }

    // BMR Calculation using Mifflin-St Jeor Equation
    let bmr;
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    // TDEE
    const tdee = bmr * act;

    // Water intake in liters
    const waterLiters = (w * 35) / 1000;

    // Recommended steps based on activity
    let steps;
    if (act <= 1.2) steps = 3000;
    else if (act <= 1.375) steps = 5000;
    else if (act <= 1.55) steps = 7000;
    else if (act <= 1.725) steps = 9000;
    else steps = 14000;

    // ✅ Save the values to user document
    user.height = h;
    user.weight = w;
    user.age = a;
    user.gender = gender;
    user.tdee = Math.round(tdee);
    user.waterIntake = parseFloat(waterLiters.toFixed(2));
    user.recommendedSteps = steps;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Health stats calculated and saved successfully",
      data: {
        tdee: user.tdee,
        waterIntakeLiters: user.waterIntake,
        recommendedSteps: user.recommendedSteps,
      },
    });
  } catch (error) {
    console.error("Error calculating health stats:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTask = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  if (!bookingId) {
    return res.status(400).json({ message: "bookingId is required" });
  }

  const tasks = await taskes.find({ bookingId }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: tasks,
  });
});


export const sendOtpController = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // random 6 digit

  console.log("Generated OTP:", otp);

  // Store OTP
  otpStore.set(email, {
    otp,
    expires: Date.now() + 5 * 60 * 1000,
  });

  try {
    await sendOTP(email, otp);
    res.status(200).json({ message: "OTP sent successfully", otp }); // include OTP in response (for testing)
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyOtpController = (req, res) => {
  const { email, otp } = req.body;
  const stored = otpStore.get(email);

  if (!stored) return res.status(400).json({ message: "No OTP found" });
  if (Date.now() > stored.expires)
    return res.status(400).json({ message: "OTP expired" });

  if (stored.otp.toString() !== otp.toString())
    return res.status(400).json({ message: "Invalid OTP" });
  console.log("Expected OTP:", stored.otp);
  console.log("User entered OTP:", otp);

  otpStore.delete(email); // clear OTP after success
  res.status(200).json({ message: "OTP verified" });
};
