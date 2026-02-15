import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const CTASection = () => {
  return (
    <section className="py-16 bg-base-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 border-2 border-blue-400 dark:border-blue-600 rounded-2xl p-12 md:p-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are transforming their careers and
            achieving their goals. Choose from our diverse range of courses
            today.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/courses">
              <button className="btn btn-primary gap-2 px-8 py-3">
                Explore Courses <ArrowRight size={20} />
              </button>
            </Link>
            <button className="btn btn-outline btn-primary px-8 py-3">
              View Pricing
            </button>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mt-6">
            No credit card required • Lifetime access to courses • Start free
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;