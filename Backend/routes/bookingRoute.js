import express from "express";
import { createBooking } from "../controller/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import { initiatePayment, verifyPayment } from "../controller/paymentController.js";


const bookingRoute = express.Router();

bookingRoute.post("/booking",protect,createBooking);
bookingRoute.post("/initiate",protect,initiatePayment);
bookingRoute.post("/verify",protect,verifyPayment);


export default bookingRoute;
