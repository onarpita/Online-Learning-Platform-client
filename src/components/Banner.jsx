import React, { useState, useEffect, useRef } from "react";
import {
  FaArrowRightLong,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { Link } from "react-router";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [animations, setAnimations] = useState([null, null, null]);
  const autoPlayTimer = useRef(null);

  // Load Lottie animations
  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const [education, exams, studyAbroad] = await Promise.all([
          fetch("/Education.json").then((res) => res.json()),
          fetch("/Exams Preparation..json").then((res) => res.json()),
          fetch("/Study Abroad.json").then((res) => res.json()),
        ]);
        setAnimations([education, exams, studyAbroad]);
      } catch (error) {
        console.error("Error loading animations:", error);
      }
    };
    loadAnimations();
  }, []);

  const slides = [
    {
      id: 1,
      title: "Learn Anything Anywhere Easily",
      subtitle: "Welcome to Educate",
      description:
        "Access high-quality lessons and interactive resources from top educators, empowering you to achieve your learning goals at your own pace.",
      cta: "Get Started",
    },
    {
      id: 2,
      title: "Master New Skills Fast",
      subtitle: "Expert-Led Courses",
      description:
        "Learn from industry professionals with personalized learning paths designed to accelerate your career growth.",
      cta: "Explore Courses",
    },
    {
      id: 3,
      title: "Achieve Your Dreams",
      subtitle: "Transform Your Future",
      description:
        "Join thousands of successful learners and unlock your potential with world-class education at your fingertips.",
      cta: "Start Learning",
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return;

    autoPlayTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(autoPlayTimer.current);
  }, [autoPlay, slides.length]);

  const handlePrevSlide = () => {
    setAutoPlay(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setAutoPlay(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleDotClick = (index) => {
    setAutoPlay(false);
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setAutoPlay(false);
  };

  const handleMouseLeave = () => {
    setAutoPlay(true);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "65vh", minHeight: "400px", maxHeight: "700px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence initial={false} custom={currentSlide}>
        <motion.div
          key={currentSlide}
          custom={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full bg-gradient-to-r from-base-200 to-base-300">
            <div className="max-w-6xl mx-auto h-full flex flex-col md:flex-row items-center justify-center px-4 md:px-0 gap-8 md:gap-12 py-8 md:py-0">
              {/* Left side content */}
              <motion.div
                className="flex-1 flex flex-col justify-center z-10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <p className="text-secondary font-semibold mb-2">
                  {slides[currentSlide].subtitle}
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {slides[currentSlide].title}
                </h1>
                <p className="w-full mb-6 text-sm sm:text-base md:text-lg text-gray-600 line-clamp-3">
                  {slides[currentSlide].description}
                </p>
                <div className="w-fit">
                  <Link
                    to="/courses"
                    className="btn btn-primary flex items-center gap-2 whitespace-nowrap"
                  >
                    {slides[currentSlide].cta} <FaArrowRightLong />
                  </Link>
                </div>
              </motion.div>

              {/* Right side image */}
              <motion.div
                className="flex-1 w-full md:w-auto h-full flex justify-center items-center relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.div
                  className="w-full max-w-md md:max-w-none"
                  animate={{
                    y: ["0%", "-8%", "0%", "8%", "0%"],
                    rotate: [0, 1, 0, -1, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {animations[currentSlide] && (
                    <Lottie
                      animationData={animations[currentSlide]}
                      loop={true}
                      autoplay={true}
                      className="w-full h-auto"
                    />
                  )}
                </motion.div>

                {/* Overlay card */}
                <motion.div
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-primary text-white rounded-xl p-3 md:p-5 shadow-lg w-4/5 md:w-3/4 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <h3 className="text-base md:text-lg lg:text-xl font-bold">
                    Trusted by 50K+ Students
                  </h3>
                  <p className="text-xs md:text-sm mt-1">
                    Grow Smarter Every Single Day
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-primary p-2 md:p-3 rounded-full transition-all duration-300 shadow-lg"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={16} className="md:w-5 md:h-5" />
      </button>

      <button
        onClick={handleNextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-primary p-2 md:p-3 rounded-full transition-all duration-300 shadow-lg"
        aria-label="Next slide"
      >
        <FaChevronRight size={16} className="md:w-5 md:h-5" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary w-3 h-3"
                : "bg-white/60 hover:bg-white/80 w-2 h-2"
            }`}
            whileHover={{ scale: 1.2 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator - Down arrow hint */}
      <motion.div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-xs text-gray-500 font-semibold">Scroll to explore</p>
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default Banner;