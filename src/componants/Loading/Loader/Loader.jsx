
import logo from "../../../assets/text.png"; // adjust path
import cart from "../../../assets/cart.png"; // adjust path

import React from "react";
import { motion } from "framer-motion";
// Removed Next.js Image import for React
// import Image from "next/image";


export default function FreshCartLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <motion.div className="flex flex-col items-center"  >
        <motion.div className="w-full h-28 flex items-center justify-center">
          <img src={cart} alt="FreshCart Logo" className="object-contain w-10 h-10 animate__animated  animate__bounce" />

          <img src={logo} alt="FreshCart Logo" className="object-contain w-45 h-45 animate__animated  animate__pulse" />
        </motion.div>

        <motion.p className="mt-4 text-gray-700 font-semibold text-lg" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.6 }} >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}
