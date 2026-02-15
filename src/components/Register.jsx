import React, { use, useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import { FormInput, FormCheckbox, SuccessMessage } from "./FormComponents";
import { FormLoader, ButtonLoader } from "./FormLoader";
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordStrength,
  validateURL,
} from "../utils/formValidation";

const RegexLower = /[a-z]/;
const RegexHigher = /[A-Z]/;
const RegexAll = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

const Register = () => {
  const { createAccount, updateUserProfile, googleSignIn, user, setUser } =
    use(AuthContext);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasUpper, setHasUpper] = useState(false);
  const [hasLower, setHasLower] = useState(false);
  const [has6Char, setHas6Char] = useState(false);
  const [allCheck, setAllCheck] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    email: "",
    password: "",
  });

  const handlePasswordVerification = (e) => {
    const password = e.target.value;
    setPassword(password);
    setFormData({ ...formData, password });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setHasUpper(RegexHigher.test(password));
    setHasLower(RegexLower.test(password));
    setHas6Char(password.length >= 6);
    setAllCheck(!RegexAll.test(password));
  }, [password]);

  const signInWithGoogle = () => {
    setGoogleLoading(true);
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setSuccessMessage("Google Sign-In successful!");
        toast.success("Google Sign-In Successful");
      })
      .catch((error) => {
        console.log("error:", error.message);
        setErrors({ form: error.message });
        toast.error(error.message);
      })
      .finally(() => setGoogleLoading(false));
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    console.log("Register button clicked");

    // Validation
    const newErrors = {};
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const imageError = validateURL(formData.image);
    const passwordError = validatePassword(formData.password);

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (imageError) newErrors.image = imageError;
    if (passwordError) newErrors.password = passwordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    createAccount(formData.email, formData.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        const profile = {
          displayName: formData.name,
          photoURL: formData.image,
        };
        updateUserProfile(profile)
          .then(() => {
            const updatedProfile = {
              ...loggedUser,
              displayName: formData.name,
              photoURL: formData.image,
            };
            setUser(updatedProfile);
            setSuccessMessage("Account created successfully!");
            toast.success("Account created successfully!");
            setFormData({ name: "", image: "", email: "", password: "" });
            setPassword("");
          })
          .catch((error) => {
            const errorMsg = error.message;
            setErrors({ form: errorMsg });
            toast.error(errorMsg);
          });
      })
      .catch((error) => {
        const errorMsg =
          error.message === "Firebase: Error (auth/email-already-in-use)."
            ? "Email is already in use"
            : error.message === "Firebase: Error (auth/invalid-email)."
            ? "Invalid email format"
            : error.message === "Firebase: Error (auth/weak-password)."
            ? "Password is too weak"
            : error.message;
        setErrors({ form: errorMsg });
        toast.error(errorMsg);
      })
      .finally(() => setIsLoading(false));
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="hero bg-base-200 py-5 md:min-h-screen">
        <FormLoader isLoading={isLoading} message="Creating account..." />
        <div
          data-aos="zoom-in-up"
          className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
        >
          <div className="card-body">
            <form onSubmit={handleRegistration}>
              <h2 className="font-semibold text-2xl text-center mb-3">
                Register an account
              </h2>
              <hr className="border-base-300" />

              {successMessage && <SuccessMessage message={successMessage} />}
              {errors.form && (
                <div className="alert alert-error gap-2 py-2 px-3">
                  <span className="text-sm">{errors.form}</span>
                </div>
              )}

              <fieldset className="fieldset mt-3 space-y-3">
                {/* name */}
                <FormInput
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  required
                  disabled={isLoading}
                />
                {/* image */}
                <FormInput
                  label="Image URL"
                  name="image"
                  type="url"
                  placeholder="Your image URL"
                  value={formData.image}
                  onChange={handleInputChange}
                  error={errors.image}
                  required
                  disabled={isLoading}
                />
                {/* Email */}
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  required
                  disabled={isLoading}
                />
                {/* Password */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">
                      Password <span className="text-error">*</span>
                    </span>
                  </label>
                  <div className="relative w-full">
                    <input
                      onChange={handlePasswordVerification}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      className={`input input-bordered w-full pr-10 ${
                        errors.password ? "input-error" : ""
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="z-50 absolute right-3 top-3 text-xl text-gray-500 hover:text-gray-700"
                      disabled={isLoading}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="alert alert-error gap-2 py-2 px-3 mt-1">
                      <span className="text-sm">{errors.password}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={allCheck || isLoading}
                  className="btn btn-neutral mt-4"
                >
                  {isLoading ? <ButtonLoader isLoading={true} /> : "Register"}
                </button>
              </fieldset>
            </form>

            {/* Password validation messages */}
            {password && (
              <div className="mt-3 space-y-1">
                <p className="flex gap-2 items-center">
                  {has6Char ? (
                    <FaCheckCircle className="text-xl text-green-600" />
                  ) : (
                    <IoMdCloseCircle className="text-xl text-red-600" />
                  )}
                  Must be at least 6 characters
                </p>
                <p className="flex gap-2 items-center">
                  {hasUpper ? (
                    <FaCheckCircle className="text-xl text-green-600" />
                  ) : (
                    <IoMdCloseCircle className="text-xl text-red-600" />
                  )}
                  1 Uppercase Letter
                </p>
                <p className="flex gap-2 items-center">
                  {hasLower ? (
                    <FaCheckCircle className="text-xl text-green-600" />
                  ) : (
                    <IoMdCloseCircle className="text-xl text-red-600" />
                  )}
                  1 Lowercase Letter
                </p>
              </div>
            )}

            <button
              onClick={signInWithGoogle}
              disabled={googleLoading || isLoading}
              className="btn mt-3"
            >
              {googleLoading ? (
                <ButtonLoader isLoading={true} text="Signing in..." />
              ) : (
                <>
                  <FcGoogle /> Sign in with Google
                </>
              )}
            </button>
            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/auth/login" className="font-semibold text-red-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;