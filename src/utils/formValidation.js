/**
 * Form Validation Utility
 * Provides reusable validation functions for common form fields
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

export const validatePassword = (password, minLength = 6) => {
  if (!password) return "Password is required";
  if (password.length < minLength)
    return `Password must be at least ${minLength} characters`;
  return null;
};

export const validatePasswordStrength = (password) => {
  const errors = [];
  if (password.length < 6) errors.push("At least 6 characters");
  if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("One number");
  return errors;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return null;
};

export const validateName = (name) => {
  if (!name) return "Name is required";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  return null;
};

export const validateURL = (url) => {
  if (!url) return "URL is required";
  try {
    new URL(url);
    return null;
  } catch {
    return "Please enter a valid URL";
  }
};

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === "string" && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateNumber = (value, fieldName, options = {}) => {
  const { min = 0, max = null } = options;
  if (!value && value !== 0) return `${fieldName} is required`;
  const num = parseFloat(value);
  if (isNaN(num)) return `${fieldName} must be a number`;
  if (num < min) return `${fieldName} must be at least ${min}`;
  if (max !== null && num > max) return `${fieldName} must not exceed ${max}`;
  return null;
};

export const validateMinLength = (value, fieldName, minLength) => {
  if (!value) return `${fieldName} is required`;
  if (value.toString().length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};

export const validateForm = (formData, rules) => {
  const errors = {};
  Object.keys(rules).forEach((field) => {
    const error = rules[field](formData[field] || "");
    if (error) {
      errors[field] = error;
    }
  });
  return errors;
};
