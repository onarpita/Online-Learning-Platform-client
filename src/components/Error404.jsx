import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 p-4">
      {/* Animated 404 numbers */}
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1.5, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-6xl md:text-9xl font-extrabold text-secondary"
      >
        404
      </motion.div>

      {/* Animated Text */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
        className="text-2xl md:text-4xl font-bold mt-6 text-center"
      >
        Oops! Page Not Found
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-center text-base max-w-md"
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </motion.p>

      {/* Animated Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="px-6 py-3 bg-secondary hover:bg-red-600 rounded-lg text-white font-semibold shadow-lg"
        >
          Go Back Home
        </Link>
      </motion.div>

      {/* Floating shapes for extra animation */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-6 h-6 bg-red-400 rounded-full opacity-50"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute bottom-32 right-20 w-8 h-8 bg-yellow-400 rounded-full opacity-50"
      />
    </div>
  );
};

export default Error404;