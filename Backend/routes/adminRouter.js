import express from "express"
import {getAllCoaches,getPendingCoaches,approveCoach } from "../controller/adminController.js"

const adminRouter=express.Router()

adminRouter.get("/coaches",getAllCoaches)
adminRouter.get("/pending",getPendingCoaches)
adminRouter.patch("/approve",approveCoach)

export default adminRouter