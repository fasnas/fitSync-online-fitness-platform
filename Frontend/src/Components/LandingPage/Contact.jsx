import React from "react";

const Contact = () => {
  return (
    <div className="pt-24 px-6 py-16 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-12">
          Have questions or want to know more? Drop us a message!
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your full name"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="your@email.com"
            />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label htmlFor="message" className="mb-2 font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
