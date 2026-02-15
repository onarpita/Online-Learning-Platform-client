import React from "react";

/**
 * FormSkeleton Component
 * Displays a loading skeleton while form data is being fetched
 */
export const FormSkeleton = ({ rows = 5 }) => {
  return (
    <div className="space-y-5 animate-pulse">
      {[...Array(rows)].map((_, i) => (
        <div key={i}>
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        </div>
      ))}
      <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-full mt-6"></div>
    </div>
  );
};

/**
 * FormLoader Component
 * Displays a loading spinner overlay on forms
 */
export const FormLoader = ({ isLoading, message = "Loading..." }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-gray-700 dark:text-gray-300 font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};

/**
 * FieldSkeleton Component
 * Displays a loading skeleton for a single form field
 */
export const FieldSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2"></div>
      <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
    </div>
  );
};

/**
 * ButtonLoader Component
 * Shows a loading state for submit buttons
 */
export const ButtonLoader = ({ isLoading, text = "Loading..." }) => {
  if (!isLoading) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="loading loading-spinner loading-sm"></span>
      <span>{text}</span>
    </div>
  );
};

export default FormLoader;