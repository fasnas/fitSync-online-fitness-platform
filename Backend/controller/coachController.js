import coaches from "../model/coachSchema.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { hashPassword} from "../utils/bcrypt.js";
// import { generateAccesToken } from "../utils/jwt.js";
import Booking from "../model/bookingSchema.js";

export const coachRegister = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    experience,
    expertise,
    pricing,
    role,
    freeSlots,
    status,
  } = req.body;

  const image = req.file ? req.file.path : null;

  const existing = await coaches.findOne({ email });
  if (existing) {
    return res.status(400).json({
      success: false,
      message: "coach already exist",
    });
  }


  const hashedPassword = await hashPassword(password);

  const newCoach = new coaches({
    name,
    email,
    password: hashedPassword,
    phone,
    role,
    experience,
    expertise,
    pricing,
    freeSlots,
    status,
    image,
  });
  await newCoach.save();

  return res.status(201).json({
    success: true,
    message: "coach registered, waiting for admin approval",
    newCoach
  });
});

export const getBookedUsersForCoach = asyncHandler(async (req, res) => {
  const coachId = req.user._id; 

  const bookings = await Booking.find({ coach: coachId }).populate('user', 'name email gender bmi age height weight');

  res.status(200).json({
    success: true,
    data: bookings,
  });
});


export const getCoachProfile = asyncHandler(async (req, res) => {
  const user = await coaches.findById(req.user._id);
  
  if (!user) {
    return res.status(404).json({ success: false, message: "coach not found" });
  }

  res.status(200).json({
    success: true,
    message: "Profile retrieved successfully",
    user
  });
});

export const slotUpdate = asyncHandler(async (req, res) => {
  const { freeSlots } = req.body;
  console.log(req.body)

  const coach = await coaches.findById(req.user._id);
  if (!coach) {
    return res.status(404).json({
      success: false,
      message: 'Coach not found',
    });
  }

  coach.freeSlots = freeSlots;
  await coach.save();

  res.status(200).json({
    success: true,
    message: 'Slots updated successfully',
    coach,
  });
});
