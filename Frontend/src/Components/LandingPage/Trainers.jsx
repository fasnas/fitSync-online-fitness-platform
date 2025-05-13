import React from "react";

const trainers = [
  {
    name: "John Carter",
    specialty: "Strength & Conditioning",
    image: "https://www.shutterstock.com/image-photo/handsome-man-big-muscles-posing-600nw-1953919795.jpg",
    description:
      "Certified trainer with 8+ years of experience helping clients build strength and stamina.",
  },
  {
    name: "Sophia Lane",
    specialty: "Yoga & Flexibility",
    image: "https://t3.ftcdn.net/jpg/07/32/65/04/360_F_732650497_jXQjmlrrB6qT3nZrexd0WrnmeKejmxSc.jpg",
    description:
      "Expert in yoga and flexibility, helping you enhance mindfulness and body control.",
  },
  {
    name: "Michael Lee",
    specialty: "HIIT & Weight Loss",
    image: "https://t4.ftcdn.net/jpg/03/33/92/01/360_F_333920115_MuKiRxlIL3WUPQvdEzpA0xJPfOYirIZ4.jpg",
    description:
      "High-intensity training specialist for fast and sustainable weight loss.",
  },
];

const Trainers = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-10 px-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Our Top Trainers</h2>
        <p className="text-gray-600 mt-2">Trained professionals to guide your fitness journey.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((trainer, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105"
          >
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">{trainer.name}</h3>
              <p className="text-blue-600 font-medium">{trainer.specialty}</p>
              <p className="text-gray-600 text-sm">{trainer.description}</p>
              <button className="mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Book Session
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
