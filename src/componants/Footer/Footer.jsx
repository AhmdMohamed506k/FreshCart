import React from 'react'

import style from "./Footer.module.css"

export default function Footer() {
   return (
    <footer className={`${style.footer} bg-gray-50 py-10 px-6 md:px-16 rounded-t-xl  `}>
      <div className="max-w-8xl mx-auto space-y-8">
        {/* App download section */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Get the FreshCart app
          </h2>
          <p className="text-gray-600 mb-4">
            We will send you a link, open it on your phone to download the app.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <input type="email" placeholder="Email .." className="w-full sm:w-2/3 lg:w-[87%] border text-gray-500 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button type="submit" className="bg-green-600 text-white font-medium rounded-lg px-6 py-3 hover:bg-green-700 transition" >
              Share App Link
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Payment and store links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Payment Partners */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-700">
            <span className="font-medium">Payment Partners</span>
            <div className="flex items-center gap-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_Pay_logo.svg" alt="Amazon Pay" className="h-5" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="American Express" className="h-5" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="MasterCard" className="h-5" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
            </div>
          </div>

          {/* App store links */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-gray-700">
            <span className="font-medium">Get deliveries with FreshCart</span>
            <div className="flex items-center gap-3">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-10"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
