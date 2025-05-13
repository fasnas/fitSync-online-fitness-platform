import Admin from "../model/adminSchema.js";
import coaches from "../model/coachSchema.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { comparePassword } from "../utils/bcrypt.js";
import { generateAccesToken } from "../utils/jwt.js";
import { adminLoginSchema } from "../utils/validation.js";

// export const loginAdmin = async (req, res) => {
//   try {
//     const { error } = adminLoginSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }
//     const { email, password } = req.body;
//     const admin = await Admin.findOne({ email });
//     if (!admin) return res.status(404).json({ message: "Admin not found" });

//     const isMatch = await comparePassword(password, admin.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = generateAccesToken(admin);
//     res.status(200).json({ message: "Login successful", admin, token });
//   } catch (err) {
//     res.status(500).json({ message: "Login failed" });
//   }
// };

export const getAllCoaches = asyncHandler(async (req, res) => {
  const coaches = await coaches.find().select("-password");
  res.status(200).json({ success: true, data: coaches });
});

export const getPendingCoaches = asyncHandler(async (req, res) => {
  const pendingCoaches = await coaches
    .find({ status: "pending" })
    .select("-password");
  res.status(200).json({ success: true, coaches: pendingCoaches });
});

export const approveCoach = asyncHandler(async (req, res) => {
  const coach = await coaches.findById(req.params.id);
  if (!coach) {
    res.status(404).json({ success: false, message: "Coach not found" });
    return;
  }
  coach.status = "approved";
  await coach.save();
  res
    .status(200)
    .json({ success: true, message: "Coach approved successfully" });
});

export const rejectCoach = asyncHandler(async (req, res) => {
  const coach = await coaches.findById(req.params.id);
  if (!coach) {
    res.status(404).json({ success: false, message: "Coach not found" });
    return;
  }
  await coach.remove();
  res
    .status(200)
    .json({
      success: true,
      message: "Coach rejected and removed successfully",
    });
});
