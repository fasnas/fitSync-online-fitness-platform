import React from "react";

const Blog = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Header */}
      <div className="relative w-full h-64 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b')]">
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            What is Fitness & How it Relates to Health
          </h1>
          <p className="text-gray-200 mt-2 text-center px-4">
            Discover how being fit impacts your overall health and well-being.
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white shadow-xl rounded-lg p-8 space-y-6 leading-relaxed text-gray-700">
          <p>
            Fitness is more than just a buzzword — it's a way of life. At its core, fitness refers to your body’s ability to function efficiently and effectively in work and leisure activities, be healthy, resist hypokinetic diseases (diseases from a sedentary lifestyle), and meet emergency situations.
          </p>

          <p>
            The main components of physical fitness include:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Cardiovascular Endurance</li>
              <li>Muscular Strength and Endurance</li>
              <li>Flexibility</li>
              <li>Body Composition</li>
            </ul>
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            How Fitness Impacts Health
          </h2>
          <p>
            Regular exercise has countless benefits for both physical and mental health. It strengthens the heart, lowers blood pressure, improves cholesterol levels, boosts the immune system, and even sharpens memory and thinking skills.
          </p>

          <p>
            In terms of mental health, being physically active helps reduce anxiety, depression, and negative mood by improving self-esteem and cognitive function.
          </p>

          <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600">
            “Fitness is not about being better than someone else. It’s about being better than you used to be.”
          </blockquote>

          <h2 className="text-2xl font-semibold text-gray-800 mt-4">Start Small, Stay Consistent</h2>
          <p>
            You don’t need to spend hours in the gym to improve your fitness. Small daily habits — walking, stretching, doing yoga, or even taking stairs — can make a big difference over time. Consistency is the key.
          </p>

          <p className="font-medium text-gray-800">
            Investing in fitness is investing in your future. Prioritize it today for a healthier tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
