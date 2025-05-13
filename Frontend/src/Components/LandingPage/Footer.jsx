import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">FitSync</h2>
          <p className="text-gray-400">
            Elevate your fitness journey with expert trainers, personalized workouts, and flexible plans.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/home" className="hover:text-white">Home</Link></li>
            <li><Link to="/service" className="hover:text-white">Services</Link></li>
            <li><Link to="/trainers" className="hover:text-white">Trainers</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">Email: support@fitsync.com</p>
          <p className="text-gray-400">Phone: +91 98765 43210</p>
          <p className="text-gray-400">Location: Kochi, Kerala, India</p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} FitSync. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
