import React, { useContext } from 'react';
import {  useParams } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const BookingPage = () => {
  
  const { id, price } = useParams(); // Destructure id and price from URL params
  const { coaches } = useContext(UserContext); // Get coaches from UserContext

  // Find the trainer by id from the coaches array
  const trainer = coaches.find((t) => t.id == id);

  // Handle case where trainer is not found
  if (!trainer) {
    return <div className="p-6 text-center text-red-500">Trainer not found.</div>;
  }

  // Safely access trainer plans or default to an empty object
  const planEntries = Object.entries(trainer.plans || {});

  return (
    <div className="max-w-4xl mx-auto p-6 bg">
      {/* Trainer Header */}
      <div className="relative bg-gray-100 rounded-t-xl overflow-hidden">
        <img
          src="https://img.freepik.com/free-vector/classic-vintage-rays-sunburst-retro-background_1017-33769.jpg"
          alt="Background"
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 flex items-end p-4">
          <img
            src={trainer.image}
            alt={trainer.name}
            className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
          />
          <div className="ml-4">
            <h2 className="text-xl font-bold text-white">{trainer.name}</h2>
            <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded-full mt-1 inline-block">
              {trainer.specialty}
            </span>
            <div className="text-yellow-400 mt-1">
              {'★'.repeat(Math.floor(trainer.rating))}
            </div>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="bg-white p-6 rounded-b-xl shadow space-y-6 mt-4">
        {planEntries.length > 0 ? (
          planEntries.map(([planName, planPrice], index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold capitalize text-gray-800">
                {planName.replace(/([A-Z])/g, ' $1')} Plan
              </h3>
              <p className="text-green-700 mt-2 font-medium">Plan Price: ₹{planPrice}</p>
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                  onClick={() => alert('Payment is Processing........')}
                >
                  Proceed
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No plans available for this trainer.</div>
        )}
      </div>

      {/* Optional: Show extracted price */}
      {price && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Selected Plan Price from URL: <strong>₹{price}</strong>
        </div>
      )}
    </div>
  );
};

export default BookingPage;