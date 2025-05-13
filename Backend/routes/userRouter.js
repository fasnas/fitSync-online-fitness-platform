import express from "express"
import { userRegister,getAllApprovedCoaches,getUserBookings, getUserProfile, calculateHealthStats, getTask} from "../controller/userController.js"
import { updateUserProfile,changePassword} from "../controller/userController.js"
import {protect} from "../middleware/authMiddleware.js"

const userRouter=express.Router()

userRouter.post("/register",userRegister)
userRouter.get("/coaches",getAllApprovedCoaches)
userRouter.get("/mybookings",protect,getUserBookings)
userRouter.get("/profile",protect,getUserProfile)
userRouter.patch("/update",protect,updateUserProfile)
userRouter.put("/calory",protect,calculateHealthStats)
userRouter.patch("/changepassword",protect,changePassword)
userRouter.get('/gettask/:bookingId',protect,getTask)

export default userRouter