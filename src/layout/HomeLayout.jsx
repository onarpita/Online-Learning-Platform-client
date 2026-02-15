import React from "react";
import Banner from "../components/Banner";
import PopularCourses from "../components/PopularCourses";
import TopInstructor from "../components/TopInstructor";
import AboutSection from "../components/AboutSection";
import StatsSection from "../components/StatsSection";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";
import NewsletterSection from "../components/NewsletterSection";
import CTASection from "../components/CTASection";
import { Title } from "react-head";

const HomeLayout = () => {
  return (
    <div>
      <Title>Home | TURITOR</Title>
      {/* Section 1: Hero/Banner */}
      <Banner />

      {/* Section 2: Stats */}
      <StatsSection />

      {/* Section 3: Popular Courses */}
      <div className="p-5">
        <PopularCourses />
      </div>

      {/* Section 4: Features */}
      <FeaturesSection />

      {/* Section 5: Top Instructors */}
      <div className="p-5">
        <TopInstructor />
      </div>

      {/* Section 6: About Section */}
      <div className="p-5">
        <AboutSection />
      </div>

      {/* Section 7: Testimonials */}
      <TestimonialsSection />

      {/* Section 8: FAQ */}
      <FAQSection />

      {/* Section 9: Newsletter */}
      <NewsletterSection />

      {/* Section 10: CTA */}
      <CTASection />
    </div>
  );
};

export default HomeLayout;