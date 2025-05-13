import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import users from "../model/userSchema.js";
import coaches from "../model/coachSchema.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user =
        (await users.findById(decoded.id).select("-password")) ||
        (await coaches.findById(decoded.id).select("-password"));

      if (!user) {
        return res.status(401).json({ message: "Not authorized" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
});

