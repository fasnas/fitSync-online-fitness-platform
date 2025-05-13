import React from "react";

const Home = () => {
  return (
    <div
      id="home"
      className="relative bg-cover bg-center h-screen"
      style={{
        backgroundImage:
          "url('https://hips.hearstapps.com/hmg-prod/images/asian-man-uses-digital-tablet-to-lean-plank-royalty-free-image-1584377468.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Unlock Your Potential with <span className="text-blue-400">FitSync</span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mb-8 leading-relaxed">
          Discover a new way to stay fit and motivated. Connect with certified trainers,
          join personalized programs, and take control of your health journey — all in one place.
        </p>
        <button
          onClick={() => {
            document.getElementById("service")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md"
        >
          Explore Services
        </button>
      </div>
    </div>
  );
};

export default Home;
