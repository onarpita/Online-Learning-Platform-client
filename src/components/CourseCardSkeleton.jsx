import React from "react";

const CourseCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl shadow-md h-full flex flex-col bg-base-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-300 flex-shrink-0"></div>

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Meta Info Skeleton */}
        <div className="flex justify-between items-center mb-3 gap-2">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>

        {/* Title Skeleton */}
        <div className="mb-3 space-y-2">
          <div className="h-5 bg-gray-300 rounded w-full"></div>
          <div className="h-5 bg-gray-300 rounded w-5/6"></div>
        </div>

        {/* Description Skeleton */}
        <div className="mb-3 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-4/5"></div>
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-4 bg-gray-300 rounded"></div>
            ))}
          </div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>

        {/* Instructor Skeleton */}
        <div className="flex items-center gap-3 mb-4 border-t pt-3 mt-auto">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="flex-1 space-y-1">
            <div className="h-3 bg-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="flex items-center gap-2 mt-auto">
          <div className="h-6 bg-gray-300 rounded w-16"></div>
          <div className="flex-1 h-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;