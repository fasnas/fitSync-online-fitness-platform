// import React, { useState } from 'react';

// const CoachSchedulePage = () => {
//   const [schedule, setSchedule] = useState({
//     day: '',
//     startTime: '',
//     endTime: '',
//     sessionType: '',
//     duration: '',
//     location: ''
//   });

//   const handleChange = (e) => {
//     setSchedule({ ...schedule, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitted schedule:', schedule);
//     // You can send this to your backend using fetch/axios
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Set Your Schedule</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium">Day</label>
//           <select
//             name="day"
//             value={schedule.day}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             required
//           >
//             <option value="">Select a day</option>
//             <option>Monday</option>
//             <option>Tuesday</option>
//             <option>Wednesday</option>
//             <option>Thursday</option>
//             <option>Friday</option>
//             <option>Saturday</option>
//             <option>Sunday</option>
//           </select>
//         </div>

//         <div className="flex gap-4">
//           <div className="flex-1">
//             <label className="block font-medium">Start Time</label>
//             <input
//               type="time"
//               name="startTime"
//               value={schedule.startTime}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//               required
//             />
//           </div>
//           <div className="flex-1">
//             <label className="block font-medium">End Time</label>
//             <input
//               type="time"
//               name="endTime"
//               value={schedule.endTime}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block font-medium">Session Type</label>
//           <input
//             type="text"
//             name="sessionType"
//             placeholder="e.g. Cardio, Yoga"
//             value={schedule.sessionType}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Duration (in minutes)</label>
//           <input
//             type="number"
//             name="duration"
//             value={schedule.duration}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Location / Platform</label>
//           <input
//             type="text"
//             name="location"
//             placeholder="e.g. Zoom, Gym, Park"
//             value={schedule.location}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
//         >
//           Save Schedule
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CoachSchedulePage;
