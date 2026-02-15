import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CourseCard from "./CourseCard";
import CourseCardSkeleton from "./CourseCardSkeleton";

const PopularCourses = () => {
  const { courses, loading } = use(AuthContext);
  const [popularCourse, setPopularCourse] = useState([]);

  useEffect(() => {
    if (courses && courses.length > 0) {
      const sorted = [...courses]
        .sort((a, b) => b.students_enrolled - a.students_enrolled)
        .slice(0, 8);
      setPopularCourse(sorted);
    }
  }, [courses, setPopularCourse]);

  return (
    <div className="py-16 bg-base mx-auto max-w-7xl">
      <div data-aos="fade-down" className="text-center mb-12 px-4">
        <h4 className="text-secondary font-semibold uppercase tracking-wide mb-2">
          Our Popular Courses
        </h4>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Courses That Shape Your Future
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-2">
          Explore carefully curated programs designed to build essential skills,
          empower your career, and inspire personal growth in every learner.
        </p>
      </div>

      {/* Grid with 4 columns on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <CourseCardSkeleton />
              </div>
            ))
          : Array.isArray(popularCourse) && popularCourse.length > 0
          ? popularCourse.map((course, i) => (
              <div data-aos="fade-up" data-aos-delay={i * 100} key={course._id}>
                <CourseCard course={course} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default PopularCourses;