import asyncHandler from '../middleware/asyncHandler.js';
import Booking from '../model/bookingSchema.js';
import razorpayInstance from '../config/razorpay.js';
import  crypto from "crypto"

export const initiatePayment = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;

  const booking = await Booking.findById(bookingId).populate('coach');
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  const amount = booking.paymentDetails.amount;

  const paymentOrder = await razorpayInstance.orders.create({
    amount: amount * 100,
    currency: 'INR',
    receipt: `receipt_order_${bookingId}`,
    payment_capture: 1,
  });

  res.status(200).json({
    success: true,
    orderId: paymentOrder.id,
    keyId: process.env.RAZORPAY_KEY_ID,
    amount,
    currency: 'INR',
  });
});


export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature !== razorpay_signature) {
    booking.paymentStatus = 'failed';
    booking.paymentDetails.status = 'failed';
    await booking.save();

    res.status(400);
    throw new Error('Invalid payment signature');
  }

  // ✅ Use consistent status values
  booking.paymentStatus = 'success';
  booking.paymentDetails.status = 'success';
  booking.paymentDetails.razorpay_order_id = razorpay_order_id;
  booking.paymentDetails.razorpay_payment_id = razorpay_payment_id;
  booking.paymentDetails.razorpay_signature = razorpay_signature;
  await booking.save();

  res.status(200).json({
    success: true,
    message: 'Payment verified and booking confirmed',
    booking,
  });
});
