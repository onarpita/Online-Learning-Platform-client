import React, { use, useState, useRef } from "react"; // Added useRef
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router"; // Cleaned up unused Navigate
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FormInput, SuccessMessage } from "./FormComponents";
import { FormLoader, ButtonLoader } from "./FormLoader";
import { validateEmail, validatePassword } from "../utils/formValidation";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null); // Reference to the form element

  const { userSignIn, googleSignIn } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  // --- New Auto-fill Functionality ---
  const handleAutoFill = (role) => {
    const email =
      role === "admin"
        ? import.meta.env.VITE_DEMO_ADMIN
        : import.meta.env.VITE_DEMO_USER;

    const password =
      role === "admin"
        ? import.meta.env.VITE_DEMO_ADMIN_PASSWORD
        : import.meta.env.VITE_DEMO_USER_PASSWORD;

    if (formRef.current) {
      formRef.current.email.value = email;
      formRef.current.password.value = password;
      // Clear errors when auto-filling to provide a clean slate
      setErrors({});
    }
  };

  const handleForgetPassword = (e) => {
    const email = formRef.current.email.value; // Access via ref for reliability
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    navigate("/auth/forgot-password", { state: { email } });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const newErrors = {};
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    userSignIn(email, password)
      .then((result) => {
        setSuccessMessage("Login successful! Redirecting...");
        toast.success("Login Successful");
        form.reset();
        setTimeout(() => {
          navigate(`${location.state ? location.state : "/"}`);
        }, 500);
      })
      .catch((error) => {
        const errorMessage = error.message.includes("user-not-found")
          ? "No account found with this email"
          : error.message.includes("wrong-password")
          ? "Incorrect password"
          : error.message;
        setErrors({ form: errorMessage });
        toast.error(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  const signInWithGoogle = () => {
    setGoogleLoading(true);
    googleSignIn()
      .then(() => {
        setSuccessMessage("Google Sign-In successful!");
        toast.success("Google Sign-In Successful");
        setTimeout(() => {
          navigate(`${location.state ? location.state : "/"}`);
        }, 500);
      })
      .catch((error) => {
        setErrors({ form: error.message });
        toast.error(error.message);
      })
      .finally(() => setGoogleLoading(false));
  };

  return (
    <div className="bg-base-200">
      <FormLoader isLoading={isLoading} message="Signing in..." />
      <div className="hero py-5 md:min-h-[calc(100vh-64px)]">
        <div
          data-aos="zoom-in-up"
          className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
        >
          <div className="card-body">
            {/* Added ref to form */}
            <form onSubmit={handleLogin} ref={formRef}>
              <h2 className="font-semibold text-2xl text-center mb-3">
                Login to your account
              </h2>

              {/* --- Demo Buttons Section --- */}
              <div className="flex flex-col gap-2 mb-4">
                <p className="text-xs text-center text-gray-500 uppercase font-bold">
                  Quick Login (Demo)
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleAutoFill("user")}
                    className="btn btn-xs btn-outline btn-info flex-1"
                  >
                    User
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAutoFill("admin")}
                    className="btn btn-xs btn-outline btn-accent flex-1"
                  >
                    Admin
                  </button>
                </div>
              </div>

              <hr className="border-base-300" />
              {successMessage && <SuccessMessage message={successMessage} />}
              {errors.form && (
                <div className="alert alert-error gap-2 py-2 px-3">
                  <span className="text-sm">{errors.form}</span>
                </div>
              )}

              <fieldset className="fieldset mt-3 space-y-3">
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  error={errors.email}
                  required
                  disabled={isLoading}
                />

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">
                      Password <span className="text-error">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
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
                      className="z-10 absolute right-3 top-3 text-xl text-gray-500 hover:text-gray-700"
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

                <div className="mt-2">
                  <a
                    onClick={handleForgetPassword}
                    className="link link-hover text-sm cursor-pointer"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary mt-4 w-full"
                >
                  {isLoading ? <ButtonLoader isLoading={true} /> : "Login"}
                </button>
              </fieldset>
            </form>

            <button
              onClick={signInWithGoogle}
              disabled={googleLoading || isLoading}
              className="btn mt-3 w-full flex items-center justify-center gap-2"
            >
              {googleLoading ? (
                <ButtonLoader isLoading={true} text="Signing in..." />
              ) : (
                <>
                  <FcGoogle /> Sign in with Google
                </>
              )}
            </button>

            <p className="text-center my-3">
              Don’t have an account?{" "}
              <Link
                to="/auth/register"
                className="font-semibold text-secondary"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;