import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../context/Axios";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
import { Star } from "lucide-react";
import { IoIosPeople, IoMdTime } from "react-icons/io";
import { FaGlobe } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import ReviewChart from "./ReviewChart";
import Swal from "sweetalert2";
import { Title } from "react-head";

const CourseDetails = () => {
  const { user, loading } = use(AuthContext);
  const [sp_course, setSp_course] = useState([]);
  const { id } = useParams();

  const handleEnrollCourse = (id) => {
    const enrolledCourse = { id: id, email: user.email };
    console.log(enrolledCourse);
    Swal.fire({
      title: "Are you sure?",
      text: "You Will be charged Automatically !",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Enroll Now!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosInstance.post(
            "/add-enrollment-course",
            enrolledCourse
          );
          console.log(res);
          if (res.data.insertedId) {
            Swal.fire("Enrolled!", "This course has Enrolled.", "success");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to delete course.", "error");
        }

        Swal.fire({
          title: "Enrolled !",
          text: "Your Course Enrolled Successfully",
          icon: "success",
        });
      }
    });
  };

  // console.log(id);

  useEffect(() => {
    axiosInstance.get(`/courses/${id}`).then((res) => {
      setSp_course(res.data);
    });
  }, [id]);

  if (loading) {
    return <Loading></Loading>;
  }

  console.log(sp_course);

  const {
    title,
    short_description,
    description,
    level,
    language,
    duration_hours,
    lectures_count,
    price,
    discount_percent,
    thumbnail_url,
    instructor,
    rating,
    students_enrolled,
    requirements,
    outcomes,
    curriculum,
    certificate_included,
  } = sp_course;

  const discountedPrice = price - (price * discount_percent) / 100;

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <Title>Course Details | TURITOR</Title>
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-25">
        <div>
          <img
            src={thumbnail_url}
            alt={title}
            className="w-full h-full rounded-2xl shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          <p className="text-gray-600">{short_description}</p>
          <div className="flex items-center gap-2 text-yellow-500">
            <Star className="w-5 h-5 fill-yellow-400" />
            <span className="font-semibold">{rating?.average}</span>
            <span className="text-gray-500">
              ({rating?.reviews_count} reviews)
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <IoMdTime /> {duration_hours} hrs
            </span>
            <span className="flex items-center gap-1">
              <IoIosPeople /> {students_enrolled} students
            </span>
            <span>{lectures_count} lectures</span>
            <span>{level}</span>
            <span className="flex items-center gap-1">
              <FaGlobe /> {language}
            </span>
          </div>

          {/* Price */}
          <div className="mt-4">
            {sp_course.is_paid ? (
              <div>
                <span className="text-3xl font-bold text-secondary">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="line-through text-gray-500 ml-2">
                  ${price.toFixed(2)}
                </span>
                <span className="ml-2 text-green-600 font-medium">
                  {discount_percent}% off
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-green-600">Free</span>
            )}
          </div>

          <button
            onClick={() => {
              handleEnrollCourse(sp_course.id);
            }}
            className="btn btn-primary w-fit mt-4 px-6 py-2 rounded-lg"
          >
            Enroll Now
          </button>
        </div>
      </div>
      {/* Instructor Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-lg mx-auto mt-12"
      >
        {/* Glow Background */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-80 dark:opacity-80"></div>

        {/* Card */}
        <div
          className="
        relative p-6 rounded-3xl shadow-lg border transition-all duration-500
        bg-white/60 backdrop-blur-xl border-gray-200
        hover:scale-[1.02]
        dark:bg-white/10 dark:border-white/20 dark:backdrop-blur-xl
      "
        >
          {/* Avatar */}
          <motion.img
            src={instructor?.avatar_url}
            alt={instructor?.name}
            className="w-28 h-28 rounded-full mx-auto object-cover shadow-lg border-4 border-white/60 dark:border-white/30"
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ type: "spring", stiffness: 200 }}
          />

          {/* Info */}
          <div className="mt-5 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {instructor?.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {instructor?.title}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {instructor?.bio}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-5 mt-5 text-gray-700 dark:text-white">
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, color: "#0077b5" }}
              className="transition-colors"
            >
              <FaLinkedin size={20} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, color: "#1da1f2" }}
              className="transition-colors"
            >
              <FaGlobe size={20} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, color: "#e63946" }}
              className="transition-colors"
            >
              <FaEnvelope size={20} />
            </motion.a>
          </div>
        </div>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-10 text-center mt-20">
        {/* Description */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">About this course</h2>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Outcomes */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">What you’ll learn</h2>
          <ul className="ml-6 space-y-1 text-gray-700">
            {outcomes?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Requirements</h2>
          <ul className="ml-6 space-y-1 text-gray-700">
            {requirements?.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>

        {/* Curriculum */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Curriculum</h2>
          {curriculum?.map((section) => (
            <div key={section.section_id} className="mb-6">
              <h3 className="font-semibold text-lg mb-2">
                {section.order}. {section.title}
              </h3>
              <ul className="ml-6 space-y-1 text-gray-700">
                {section.lectures?.map((lec) => (
                  <li key={lec.id}>
                    🎬 {lec.title}{" "}
                    <span className="text-gray-500">
                      ({lec.length_minutes} min)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Student Reviews</h2>

        {/* Chart */}
        <ReviewChart distribution={sp_course.rating?.distribution} />
      </div>
      {/* Certificate */}
      {certificate_included && (
        <div className="mt-10 p-5 bg-green-50 border border-green-200 rounded-xl">
          <h2 className="text-lg font-semibold text-green-700">
            🎓 Certificate Included
          </h2>
          <p className="text-gray-600 text-sm">
            You’ll receive a verified certificate upon completion of this
            course.
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;