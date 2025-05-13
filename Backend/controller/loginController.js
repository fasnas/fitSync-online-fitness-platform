import asyncHandler from "../middleware/asyncHandler.js";
import users from "../model/userSchema.js";
import coaches from "../model/coachSchema.js";
import { comparePassword } from "../utils/bcrypt.js";
import { generateAccesToken } from "../utils/jwt.js";

export const login = asyncHandler(async (req, res) => {
  try {
    // Validate input
    const { email, password } = req.body;
    console.log(email)
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and password are required" 
      });
    }

    console.log("Login Request Received for:", email);
    
    // First check in users collection
    let user = await users.findOne({ email });
    let role = "user";
    
    // If not found in users, check in coaches collection
    if (!user) {
      user = await coaches.findOne({ email });
      if (user) role = "coach";
    }
    
    // If user not found in either collection
    if (!user) {
      console.log("User not found with email:", email);
      return res.status(404).json({ 
        success: false, 
        message: "User not found with this email" 
      });
    }
    
    // Check coach approval status
    if (role === "coach" && user.status !== "approved") {
      console.log("Coach not approved:", user.email);
      return res.status(403).json({
        success: false,
        message: "Your coach account is pending approval"
      });
    }
    
    // Verify password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      console.log("Invalid password for:", email);
      return res.status(401).json({ 
        success: false, 
        message: "Invalid password" 
      });
    }
    
    // Generate JWT token
    const token = generateAccesToken(user);
    
    // Remove sensitive data before sending response
    const userResponse = { ...user.toObject() };
    delete userResponse.password;
    
    // Send successful response
    res.status(200).json({
      success: true,
      message: "Login successful",
      role,
      token,
      user: userResponse,
      
    });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message
    });
  }
});