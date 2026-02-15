import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosInstance from "../context/Axios";
import Loading from "./Loading";
import Swal from "sweetalert2";
import { Title } from "react-head";
import {
  FormInput,
  FormTextarea,
  FormCheckbox,
  SuccessMessage,
} from "./FormComponents";
import { FormLoader, ButtonLoader, FormSkeleton } from "./FormLoader";
import {
  validateRequired,
  validateNumber,
  validateURL,
} from "../utils/formValidation";

const UpdateCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsFetching(true);
        const res = await axiosInstance.get(`/my-courses/${id}`);
        // If your server returns array (like find().toArray()), handle that
        setCourse(Array.isArray(res.data) ? res.data[0] : res.data);
      } catch (error) {
        console.error("Error fetching course:", error);
        setErrors({ fetch: "Failed to load course data" });
      } finally {
        setIsFetching(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedData = {
      title: form.title.value,
      description: form.description.value,
      duration: form.duration.value,
      price: form.price.value,
      category: form.category.value,
      email: form.email.value,
      imageUrl: form.imageUrl.value,
      name: form.name.value,
      photoUrl: form.photoURL.value,
      isFeatured: form.isFeatured.checked,
    };

    // Validation
    const newErrors = {};
    const titleError = validateRequired(updatedData.title, "Title");
    const descriptionError = validateRequired(
      updatedData.description,
      "Description"
    );
    const durationError = validateNumber(updatedData.duration, "Duration", {
      min: 0,
    });
    const priceError = validateNumber(updatedData.price, "Price", { min: 0 });
    const categoryError = validateRequired(updatedData.category, "Category");
    const imageError = validateURL(updatedData.imageUrl);

    if (titleError) newErrors.title = titleError;
    if (descriptionError) newErrors.description = descriptionError;
    if (durationError) newErrors.duration = durationError;
    if (priceError) newErrors.price = priceError;
    if (categoryError) newErrors.category = categoryError;
    if (imageError) newErrors.imageUrl = imageError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const res = await axiosInstance.patch(`/courses/${id}`, updatedData);

      if (res.status === 200) {
        setSuccessMessage("Course updated successfully! Redirecting...");
        Swal.fire("Updated!", "Course updated successfully.", "success");
        setTimeout(() => {
          navigate("/courses/my-courses");
        }, 1500);
      }
    } catch (err) {
      console.error("Error updating course:", err);
      const errorMsg = err.response?.data?.message || "Failed to update course";
      setErrors({ form: errorMsg });
      Swal.fire("Error", errorMsg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <FormSkeleton rows={8} />;
  if (errors.fetch) {
    return (
      <div className="max-w-3xl mx-auto bg-base-200 p-6 rounded-2xl shadow-lg mt-8">
        <div className="alert alert-error gap-2 py-2 px-3">
          <span className="text-sm">{errors.fetch}</span>
        </div>
      </div>
    );
  }
  if (!course)
    return (
      <div className="max-w-3xl mx-auto bg-base-200 p-6 rounded-2xl shadow-lg mt-8">
        <div className="alert alert-warning gap-2 py-2 px-3">
          <span className="text-sm">Course not found</span>
        </div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto bg-base-200 p-6 rounded-2xl shadow-lg mt-8">
      <FormLoader isLoading={isLoading} message="Updating course..." />
      <Title>Update Courses | TURITOR</Title>
      <h2 className="text-2xl font-bold text-center mb-4">
        Update <span className="text-secondary">Course</span>
      </h2>
      {successMessage && <SuccessMessage message={successMessage} />}
      {errors.form && (
        <div className="alert alert-error gap-2 py-2 px-3 mb-4">
          <span className="text-sm">{errors.form}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Title"
          name="title"
          type="text"
          defaultValue={course.title}
          placeholder="Title"
          error={errors.title}
          required
          disabled={isLoading}
        />
        <FormTextarea
          label="Description"
          name="description"
          defaultValue={course.description}
          placeholder="Description"
          rows={4}
          error={errors.description}
          required
          disabled={isLoading}
        />
        <FormInput
          label="Duration (hours)"
          name="duration"
          type="number"
          defaultValue={course.duration}
          placeholder="Duration (hours)"
          error={errors.duration}
          disabled={isLoading}
        />
        <FormInput
          label="Price"
          name="price"
          type="number"
          defaultValue={course.price}
          placeholder="Price"
          error={errors.price}
          disabled={isLoading}
        />
        <FormInput
          label="Category"
          name="category"
          type="text"
          defaultValue={course.category}
          placeholder="Category"
          error={errors.category}
          disabled={isLoading}
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          defaultValue={course.email}
          placeholder="Email"
          disabled
        />
        <FormInput
          label="Thumbnail URL"
          name="imageUrl"
          type="url"
          defaultValue={course.imageUrl}
          placeholder="Image URL"
          error={errors.imageUrl}
          disabled={isLoading}
        />
        <FormInput
          label="Instructor Name"
          name="name"
          type="text"
          defaultValue={course.name}
          placeholder="Instructor Name"
          disabled
        />
        <FormInput
          label="Instructor Photo URL"
          name="photoURL"
          type="url"
          defaultValue={course.photoURL}
          placeholder="Instructor Photo"
          disabled
        />

        <FormCheckbox
          label="Mark as Featured"
          name="isFeatured"
          defaultChecked={course.isFeatured}
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-secondary w-full"
        >
          {isLoading ? <ButtonLoader isLoading={true} /> : "Update Course"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;