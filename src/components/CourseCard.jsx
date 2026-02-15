import { Star } from "lucide-react";
import React from "react";
import { IoIosPeople, IoMdTime } from "react-icons/io";
import { Link } from "react-router";

const CourseCard = ({ course }) => {
  return (
    <div className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 h-full flex flex-col bg-base-100">
      {/* Image Container - Fixed Height */}
      <div className="h-48 overflow-hidden flex-shrink-0">
        <img
          src={course.thumbnail_url}
          alt={course.title}
          a
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container - Flexible Height */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Meta Info - Duration & Students */}
        <div className="flex justify-between items-center mb-3 text-xs text-gray-500 flex-wrap gap-2">
          <span className="flex items-center gap-1">
            <IoMdTime className="text-secondary text-sm" />
            {course.duration_hours} hrs
          </span>
          <span className="flex items-center gap-1">
            <IoIosPeople className="text-secondary text-sm" />
            {course.students_enrolled} students
          </span>
        </div>

        {/* Title - Fixed Height with Line Clamp */}
        <h3 className="text-lg font-semibold mb-3 line-clamp-2 min-h-14 flex items-start">
          {course.title}
        </h3>

        {/* Short Description */}
        {course.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {course.description}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3 text-yellow-500">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, j) => (
              <Star
                key={j}
                size={14}
                fill="currentColor"
                className="text-yellow-400"
              />
            ))}
          </div>
          <span className="text-gray-600 text-xs ml-1">
            ({course.rating?.average || "4.5"})
          </span>
        </div>

        {/* Instructor Info */}
        <div className="flex items-center gap-3 mb-4 border-t pt-3 mt-auto">
          <img
            src={course.instructor.avatar_url}
            alt={course.instructor.name}
            className="w-10 h-10 object-cover rounded-full flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-500">Instructor</p>
            <p className="text-sm font-semibold truncate">
              {course.instructor.name}
            </p>
          </div>
        </div>

        {/* Price & Button Container */}
        <div className="flex items-center gap-2 mt-auto">
          {course.price && (
            <span className="text-lg font-bold text-secondary">
              ${course.price}
            </span>
          )}
          <Link
            to={`/courses/${course._id}`}
            className="flex-1 btn btn-sm btn-primary text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;