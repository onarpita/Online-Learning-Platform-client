import React, { use, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../context/Axios";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Title } from "react-head";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const { user, loading } = use(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    category: "",
  });

  const navigate = useNavigate();

  const email = user?.email;

  // Fetch user's courses
  useEffect(() => {
    if (!email) return;
    axiosInstance
      .get("/my-courses", { params: { email } })
      .then((res) => {
        setCourses(res.data);
        setLoadingCourses(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingCourses(false);
      });
  }, [email]);

  // Open modal in view or edit mode
  const openModal = (course, mode) => {
    setSelectedCourse(course);
    setUpdatedData({
      title: course.title,
      description: course.description,
      price: course.price,
      duration: course.duration,
      category: course.category,
    });
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleNavigate = (id) => {
    navigate(`/courses/my-courses/${id}`);
  };

  // Save updates
  const handleSaveUpdate = async () => {
    try {
      const id = selectedCourse._id;
      const res = await axiosInstance.patch(`/courses/${id}`, updatedData);

      if (res.status === 200) {
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course._id === id ? { ...course, ...updatedData } : course
          )
        );
        Swal.fire("Updated!", "Course updated successfully.", "success");
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update course.", "error");
    }
  };

  // Delete course
  const handleDelete = async (id) => {
    console.log(id);
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete your course!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axiosInstance.delete(`/courses/${id}`);
        setCourses((prev) => prev.filter((c) => c._id !== id));
        Swal.fire("Deleted!", "Your course has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete course.", "error");
      }
    }
  };

  if (loading || loadingCourses) return <Loading />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Title>My Courses | TURITOR</Title>
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Explore <span className="text-secondary">Your</span> Courses
        </h2>
        <p className="text-gray-500 mb-2">
          Manage and update your <span className="text-secondary">courses</span>{" "}
          to stay ahead and attract more learners!
        </p>
        <hr className="border-t-2 border-gray-300 w-24 mx-auto mt-2" />
      </div>
      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {courses.map((course) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between bg-base-100"
            >
              <div>
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full rounded-md h-[200px] mb-2 object-cover"
                />
                <h3 className="text-xl font-bold line-clamp-2 min-h-14">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-2">
                  {course.description.slice(0, 60)}...
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 text-sm text-gray-500">
                  <span>
                    <strong>Price:</strong> ${course.price || "N/A"}
                  </span>
                  <span>
                    <strong>Duration:</strong> {course.duration || "N/A"}h
                  </span>
                  <span>
                    <strong>Category:</strong> {course.category || "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => openModal(course, "view")}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  View
                </button>
                <button
                  onClick={() => handleNavigate(course._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* Empty State */}
      {courses.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-base-100 rounded-lg shadow-md mt-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-2">
              You don't have any courses yet!
            </h2>
            <p className="text-gray-600 mb-4">
              Start adding your courses to see them here.
            </p>
          </motion.div>

          <Link to="/courses/add-course">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#4f46e5" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-md"
            >
              Add Course
            </motion.button>
          </Link>
        </div>
      )}
      {/* Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-base-100 rounded-lg shadow-lg p-6 w-96"
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              {modalMode === "view" ? "Course Details" : "Update Course"}
            </h2>

            <div className="space-y-3">
              <label>Title</label>
              <input
                type="text"
                value={updatedData.title}
                readOnly={modalMode === "view"}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, title: e.target.value })
                }
                className="w-full border rounded p-2"
              />
              <label>Description</label>
              <textarea
                value={updatedData.description}
                readOnly={modalMode === "view"}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded p-2"
              />
              <label>Price</label>
              <input
                type="text"
                value={updatedData.price}
                readOnly={modalMode === "view"}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, price: e.target.value })
                }
                className="w-full border rounded p-2"
              />
              <label>Duration (Hour)</label>
              <input
                type="text"
                value={updatedData.duration}
                readOnly={modalMode === "view"}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, duration: e.target.value })
                }
                className="w-full border rounded p-2"
              />
              <label>Category</label>
              <input
                type="text"
                value={updatedData.category}
                readOnly={modalMode === "view"}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, category: e.target.value })
                }
                className="w-full border rounded p-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>

              {modalMode === "edit" && (
                <button
                  onClick={handleSaveUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;