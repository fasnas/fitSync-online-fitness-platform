import express from "express";
import { coachRegister, getBookedUsersForCoach, getCoachProfile, slotUpdate } from "../controller/coachController.js";
import { upload } from "../config/clodinaryconfiq.js";
import { protect } from "../middleware/authMiddleware.js";
import { doTask } from "../controller/taskController.js";

const coachRouter = express.Router();

coachRouter.post("/register", upload.single("image"), coachRegister);
coachRouter.get("/bookeduser",protect,getBookedUsersForCoach)
coachRouter.get("/profile",protect,getCoachProfile)
coachRouter.patch("/slotupdate",protect,slotUpdate)
coachRouter.post("/task",protect,doTask)

export default coachRouter;
