import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

const FormError = ({ error }) => {
  if (!error) return null;
  return (
    <div className="alert alert-error gap-2 py-2 px-3 mt-1">
      <AiOutlineExclamationCircle className="text-lg flex-shrink-0" />
      <span className="text-sm">{error}</span>
    </div>
  );
};

export const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-medium">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`input input-bordered w-full ${
          error ? "input-error" : ""
        } ${className}`}
        required={required}
        {...props}
      />
      <FormError error={error} />
    </div>
  );
};

export const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  rows = 4,
  className = "",
  ...props
}) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-medium">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`textarea textarea-bordered w-full ${
          error ? "textarea-error" : ""
        } ${className}`}
        required={required}
        {...props}
      />
      <FormError error={error} />
    </div>
  );
};

export const FormSelect = ({
  label,
  name,
  value,
  onChange,
  error,
  options,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-medium">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`select select-bordered w-full ${
          error ? "select-error" : ""
        } ${className}`}
        required={required}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FormError error={error} />
    </div>
  );
};

export const FormCheckbox = ({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div className="form-control">
      <label className="cursor-pointer label gap-3">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`checkbox checkbox-primary ${className}`}
          {...props}
        />
        <span className="label-text font-medium">{label}</span>
      </label>
    </div>
  );
};

export const SuccessMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="alert alert-success gap-2 py-2 px-3">
      <FaCheckCircle className="text-lg flex-shrink-0" />
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default FormError;