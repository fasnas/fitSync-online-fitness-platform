import asyncHandler from "../middleware/asyncHandler.js";
import coaches from "../model/coachSchema.js";
import Booking from "../model/bookingSchema.js";


const getValidityEndDate = (startDate, plan) => {
  const end = new Date(startDate);
  switch (plan) {
    case 'oneMonth':
      end.setMonth(end.getMonth() + 1);
      break;
    case 'threeMonths':
      end.setMonth(end.getMonth() + 3);
      break;
    case 'sixMonths':
      end.setMonth(end.getMonth() + 6);
      break;
    case 'oneYear':
      end.setFullYear(end.getFullYear() + 1);
      break;
    default:
      throw new Error("Invalid plan selected");
  }
  return end;
};

export const createBooking = asyncHandler(async (req, res) => {
  const { coachId, plan, slot } = req.body;

  const today = new Date();
  const endDate = getValidityEndDate(today, plan);

  const coach = await coaches.findById(coachId);
  if (!coach) {
    res.status(404);
    throw new Error("Coach not found");
  }

  // Find the exact available slot
  const slotIndex = coach.freeSlots.findIndex(
    (s) =>
      s.start === slot.start &&
      s.end === slot.end &&
      s.status === "available"
  );

  if (slotIndex === -1) {
    res.status(400);
    throw new Error("Slot not available or already booked");
  }

  // Validate plan price
  const planPrice = coach.pricing[plan];
  if (!planPrice) {
    res.status(400);
    throw new Error("Invalid plan selected");
  }

  const booking = new Booking({
    user: req.user._id,
    coach: coachId,
    plan: plan,
    slot: coach.freeSlots[slotIndex], 
    validity: {
      start: today,
      end: endDate,
    },
    paymentDetails: {
      amount: planPrice,
    },
  });

  await booking.save();

  // Mark the slot as consumed
  coach.freeSlots[slotIndex].status = "consumed";
  await coach.save();

  res.status(201).json({
    success: true,
    message: "Booking created, proceed to payment",
    bookingId: booking._id,
    amount: planPrice,
  });
});
