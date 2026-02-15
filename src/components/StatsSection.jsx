import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaBook, FaAward, FaGlobe } from "react-icons/fa6";

const StatsSection = () => {
  const stats = [
    {
      icon: FaUsers,
      value: "50K+",
      label: "Active Learners",
      color: "text-blue-500",
    },
    {
      icon: FaBook,
      value: "1500+",
      label: "Courses Available",
      color: "text-green-500",
    },
    {
      icon: FaAward,
      value: "98%",
      label: "Success Rate",
      color: "text-yellow-500",
    },
    {
      icon: FaGlobe,
      value: "150+",
      label: "Countries",
      color: "text-purple-500",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-primary to-secondary py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <div className="mb-4 flex justify-center">
                  <Icon className={`text-5xl ${stat.color}`} />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.value}
                </h3>
                <p className="text-lg opacity-90">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;