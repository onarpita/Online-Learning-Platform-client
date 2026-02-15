import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5,
      text: "This platform transformed my career! The courses are incredibly comprehensive and the instructors are world-class.",
    },
    {
      name: "Ahmed Hassan",
      role: "Digital Marketer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
      rating: 5,
      text: "Best investment I made for my professional development. The practical skills taught here are immediately applicable.",
    },
    {
      name: "Emily Chen",
      role: "Graphic Designer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      rating: 5,
      text: "Excellent learning environment with supportive community. I gained confidence and landed my dream job!",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Learners Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful students who have transformed their
            careers through our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-bold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;