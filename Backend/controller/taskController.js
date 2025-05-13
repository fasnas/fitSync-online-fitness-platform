import mongoose from 'mongoose';
import asyncHandler from '../middleware/asyncHandler.js';
import taskes from '../model/taskSchema.js';

export const doTask = asyncHandler(async (req, res) => {
  const { bookingId, tasks } = req.body;
  console.log(bookingId)

  console.log('Incoming task data:', req.body);

  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    res.status(400);
    throw new Error('Invalid booking ID');
  }

  if (!Array.isArray(tasks) || tasks.length === 0) {
    res.status(400);
    throw new Error('Tasks array is required');
  }

  // Optional: Validate each task in the array
  for (const task of tasks) {
    if (!task.taskDetails || !task.taskDetails.trim()) {
      res.status(400);
      throw new Error('Each task must have taskDetails');
    }
    if (!task.description || !task.description.trim()) {
      res.status(400);
      throw new Error('Each task must have a description');
    }
    if (!task.time || !task.time.trim()) {
      res.status(400);
      throw new Error('Each task must have a time');
    }
  }

  const taskDocument = new taskes({
    bookingId,
    tasks,
  });

  await taskDocument.save();

  res.status(201).json({
    success: true,
    data: taskDocument,
  });
});

