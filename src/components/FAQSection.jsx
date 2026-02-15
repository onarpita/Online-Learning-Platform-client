import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        "Simply browse our course catalog, select a course you're interested in, and click 'Enroll'. You'll have instant access to all course materials and can start learning right away.",
    },
    {
      question: "Can I get a certificate upon completion?",
      answer:
        "Yes! Upon completing a course and passing the final assessment, you'll receive a recognized certificate that you can share on your professional profiles.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "We offer a 30-day money-back guarantee if you're not satisfied with your purchase. No questions asked!",
    },
    {
      question: "Do courses have a deadline?",
      answer:
        "No, you have lifetime access to your purchased courses. Learn at your own pace without any time constraints.",
    },
    {
      question: "Can I download course materials?",
      answer:
        "Yes, most course materials including videos, PDFs, and resources can be downloaded for offline access.",
    },
    {
      question: "How do I get support if I'm stuck?",
      answer:
        "Our instructors and support team are available to help. You can post questions in the course discussion forum or contact support directly.",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Find answers to common questions about our platform and courses
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-800 text-left">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-primary" size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200"
                  >
                    <div className="px-6 py-4 text-gray-600 bg-gray-50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;