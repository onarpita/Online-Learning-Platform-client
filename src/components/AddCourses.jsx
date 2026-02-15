import React, { useState, use } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axiosInstance from "../context/Axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
import { useNavigate } from "react-router";
import { Title } from "react-head";
import {
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  SuccessMessage,
} from "./FormComponents";
import { FormLoader, ButtonLoader } from "./FormLoader";
import {
  validateRequired,
  validateNumber,
  validateURL,
} from "../utils/formValidation";

const AddCourse = () => {
  const navigate = useNavigate();
  const { user, loading } = use(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    price: "",
    duration: "",
    category: "",
    description: "",
    isFeatured: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return;

    // Validation
    const newErrors = {};
    const titleError = validateRequired(formData.title, "Title");
    const imageError = validateURL(formData.imageUrl);
    const priceError = validateNumber(formData.price, "Price", { min: 0 });
    const durationError = validateNumber(formData.duration, "Duration", {
      min: 0,
    });
    const categoryError = validateRequired(formData.category, "Category");
    const descriptionError = validateRequired(
      formData.description,
      "Description"
    );

    if (titleError) newErrors.title = titleError;
    if (imageError) newErrors.imageUrl = imageError;
    if (priceError) newErrors.price = priceError;
    if (durationError) newErrors.duration = durationError;
    if (categoryError) newErrors.category = categoryError;
    if (descriptionError) newErrors.description = descriptionError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    const dataToSend = {
      ...formData,
      email: user.email,
      name: user.displayName,
      photoUrl: user.photoURL,
    };

    try {
      const res = await axiosInstance.post("/add-course", dataToSend);
      if (res.data.insertedId) {
        setSuccessMessage("Course added successfully! Redirecting...");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Course Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/courses/my-courses");
        }, 1500);

        // Reset form
        setFormData({
          title: "",
          imageUrl: "",
          price: "",
          duration: "",
          category: "",
          description: "",
          isFeatured: false,
        });
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Failed to add course";
      setErrors({ form: errorMsg });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || !user?.email) return <Loading />;

  const inputVariants = (x) => ({
    initial: { opacity: 0, x },
    animate: { opacity: 1, x: 0 },
  });

  return (
    <>
      <Title>Add Courses | TURITOR</Title>
      <FormLoader isLoading={isLoading} message="Adding course..." />
      <motion.div
        className="max-w-2xl mx-auto my-10 bg-base-100 shadow-xl rounded-2xl p-8 border border-gray-200"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          Add New Course
        </h2>

        {successMessage && <SuccessMessage message={successMessage} />}
        {errors.form && (
          <div className="alert alert-error gap-2 py-2 px-3 mb-4">
            <span className="text-sm">{errors.form}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <motion.div
            variants={inputVariants(-40)}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
          >
            <FormInput
              label="Title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter course title"
              error={errors.title}
              required
              disabled={isLoading}
            />
          </motion.div>

          {/* Image URL */}
          <motion.div
            variants={inputVariants(40)}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <FormInput
              label="Image URL"
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image link"
              error={errors.imageUrl}
              required
              disabled={isLoading}
            />
          </motion.div>

          {/* Price */}
          <motion.div
            variants={inputVariants(-40)}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
          >
            <FormInput
              label="Price (USD)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              error={errors.price}
              required
              disabled={isLoading}
            />
          </motion.div>

          {/* Duration */}
          <motion.div
            variants={inputVariants(40)}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
          >
            <FormInput
              label="Duration (hours)"
              name="duration"
              type="number"
              step="0.1"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Enter duration"
              error={errors.duration}
              required
              disabled={isLoading}
            />
          </motion.div>

          {/* Category */}
          <motion.div
            variants={inputVariants(-40)}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.5 }}
          >
            <FormSelect
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              error={errors.category}
              options={[
                { value: "Development", label: "Development" },
                { value: "Design", label: "Design" },
                { value: "Business", label: "Business" },
                { value: "Marketing", label: "Marketing" },
              ]}
              required
              disabled={isLoading}
            />
          </motion.div>

          {/* Description */}
          <motion.div
            variants={inputVariants(40)}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.6 }}
          >
            <FormTextarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description"
              error={errors.description}
              rows={4}
              required
              disabled={isLoading}
            />
          </motion.div>

          {/* isFeatured */}
          <motion.div
            className="flex items-center gap-3 mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <FormCheckbox
              label="Mark as Featured Course"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              disabled={isLoading}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full mt-4 text-lg font-semibold"
            >
              {isLoading ? <ButtonLoader isLoading={true} /> : "Add Course"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </>
  );
};

export default AddCourse;