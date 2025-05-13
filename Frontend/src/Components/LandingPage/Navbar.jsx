import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate=useNavigate()

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          Fit<span className="text-blue-600">Sync</span>
        </div>

        {/* Menu Links */}
        <div className="space-x-6 hidden md:flex text-gray-700 font-medium">
          <button onClick={() => scrollToSection('home')} className="hover:text-blue-600 transition">Home</button>
          <button onClick={() => scrollToSection('service')} className="hover:text-blue-600 transition">Services</button>
          <button onClick={() => scrollToSection('trainers')} className="hover:text-blue-600 transition">Trainers</button>
          <button onClick={() => scrollToSection('blog')} className="hover:text-blue-600 transition">Blog</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-blue-600 transition">Contact</button>
        </div>

        {/* Sign In Button */}
        <div className="hidden md:block">
          <button onClick={()=>navigate("/signup")} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
