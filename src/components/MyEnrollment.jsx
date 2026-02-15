import React, { use, useEffect, useState, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../context/Axios";
import Loading from "./Loading";
import { motion } from "framer-motion";
import { Title } from "react-head";

const MyEnrollment = () => {
  const { courses, user, loading } = use(AuthContext);
  const [enrolledCoursesServer, setEnrolledCoursesServer] = useState([]);
  const [loadingEnrollment, setLoadingEnrollment] = useState(true);

  const email = user?.email;

  // Fetch enrollment data from server
  useEffect(() => {
    if (!email) return;

    axiosInstance
      .get("/my-enrollment", { params: { email } })
      .then((res) => {
        setEnrolledCoursesServer(res.data);
        setLoadingEnrollment(false);
      })
      .catch((err) => {
        console.error("Error fetching enrollment:", err);
        setLoadingEnrollment(false);
      });
  }, [email]);

  // Derive the filtered list using useMemo to avoid unnecessary re-renders
  const enrolledCourses = useMemo(() => {
    if (!courses || !enrolledCoursesServer.length) return [];

    return courses.filter((c) =>
      enrolledCoursesServer.some(
        (e) => e.id === c.id && e.email === user?.email
      )
    );
  }, [courses, enrolledCoursesServer, user?.email]);

  if (loading || loadingEnrollment) {
    return <Loading />;
  }

  return (
    <div>
      <Title>My Enrollment | TURITOR</Title>

      <section className="my-10 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">
          My <span className="text-indigo-600">Enrollments</span>
        </h2>

        {enrolledCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-gray-500 mt-10"
          >
            You haven’t enrolled in any courses yet. Start learning now!
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolledCourses.map((course, index) => (
              <motion.div
                key={course._id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white shadow-lg border border-gray-100 rounded-2xl p-5 flex flex-col h-full"
              >
                {/* Image Container with Fixed Aspect Ratio */}
                <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl">
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                {/* Content Section */}
                <div className="flex-grow">
                  <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {course.short_description}
                  </p>
                </div>

                {/* Bottom Section (Always stays at bottom) */}
                <div className="mt-4 border-t pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Progress
                    </span>
                    <span className="text-sm font-bold text-indigo-600">
                      {Math.round((course.progress || 0) * 100)}%
                    </span>
                  </div>

                  {/* Progress Bar Visual */}
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: `${(course.progress || 0) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    {course.completed ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                        Completed
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
                        In Progress
                      </span>
                    )}
                    <button className="text-indigo-600 text-sm font-semibold hover:text-indigo-800 transition-colors">
                      View Details →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyEnrollment;