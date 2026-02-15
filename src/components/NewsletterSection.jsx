import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-6 flex justify-center">
            <Mail className="text-white dark:text-blue-200" size={40} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-white mb-3">
            Stay Updated
          </h2>
          <p className="text-white/90 dark:text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get exclusive content, course
            recommendations, and special offers delivered to your inbox
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col md:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white dark:bg-blue-500 text-blue-600 dark:text-white font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-blue-600 transition-colors"
            >
              Subscribe
            </button>
          </form>

          {subscribed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center justify-center gap-2 text-white dark:text-blue-100"
            >
              <Check size={20} />
              <span>Thank you for subscribing!</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;