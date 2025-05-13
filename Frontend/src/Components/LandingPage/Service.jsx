import React from "react";
import { Dumbbell, Clock, UserCheck, Heart } from "lucide-react";

const services = [
  {
    icon: <Dumbbell size={32} />,
    title: "Personal Training",
    description: "One-on-one sessions with expert trainers tailored to your goals and fitness level.",
  },
  {
    icon: <Clock size={32} />,
    title: "Flexible Scheduling",
    description: "Book sessions based on your time and trainer availability. Train at your convenience.",
  },
  {
    icon: <UserCheck size={32} />,
    title: "Certified Coaches",
    description: "All trainers are certified professionals with years of real-world experience.",
  },
  {
    icon: <Heart size={32} />,
    title: "Customized Plans",
    description: "Get diet charts, workout routines, and progress tracking customized just for you.",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
        <p className="mt-4 text-gray-600">Discover what we offer to help you reach your fitness goals.</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-xl transition"
          >
            <div className="text-indigo-600 mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
