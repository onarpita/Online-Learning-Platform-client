import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Zap, Users, Award } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Expert Instructors",
      description:
        "Learn from industry professionals with years of real-world experience",
    },
    {
      icon: Zap,
      title: "Self-Paced Learning",
      description:
        "Study at your own speed, anytime and anywhere that suits you best",
    },
    {
      icon: Users,
      title: "Community Support",
      description:
        "Connect with fellow learners and get help when you need it most",
    },
    {
      icon: Award,
      title: "Recognized Certificates",
      description:
        "Earn certificates valued by top companies worldwide in your field",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide everything you need to succeed in your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;