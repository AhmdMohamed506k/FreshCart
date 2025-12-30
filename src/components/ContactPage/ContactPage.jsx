import React, { useState } from "react";
import FreshCartLoader from "../Loading/Loader/Loader";

export default function ContactPage() {

  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1200);


  if (loading) return <FreshCartLoader />;

  return <>
    <head>
      <meta charSet="utf-8" />
      <title>contact Us</title>

    </head>
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-10">
      <div className="bg-white max-w-5xl w-full p-10 md:p-16 rounded-xl shadow-xl shadow-gray-200">

        {/* Title */}
        <h1 className="text-3xl font-semibold text-center">Send Us</h1>

        {/* Description */}
        <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          quaerat unde quam dolor culpa veritatis inventore, aut commodi eum veniam vel.
        </p>

        {/* Divider */}
        <hr className="my-10" />

        {/* Form */}
        <form className="space-y-8">

          {/* Two Column Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-2">Your name *</label>
              <input
                type="text"
                className="bg-gray-100 rounded-lg p-3 outline-none border border-gray-200 focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-2">Your email *</label>
              <input
                type="email"
                className="bg-gray-100 rounded-lg p-3 outline-none border border-gray-200 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-2">Subject *</label>
            <input
              type="text"
              className="bg-gray-100 rounded-lg p-3 outline-none border border-gray-200 focus:border-blue-500"
              placeholder="Subject"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-2">Your message</label>
            <textarea
              rows="5"
              className="bg-gray-100 rounded-lg p-3 outline-none border border-gray-200 focus:border-blue-500"
              placeholder="Write your message..."
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
          >
            Send Message
          </button>

        </form>
      </div>
    </div>
  </>
}
