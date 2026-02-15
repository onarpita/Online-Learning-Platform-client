import React, { use, useState } from "react";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { FormInput, SuccessMessage } from "./FormComponents";
import { FormLoader, ButtonLoader } from "./FormLoader";
import { validateEmail } from "../utils/formValidation";

const ForgetPassword = () => {
  const { passwordReset } = use(AuthContext);
  const location = useLocation();
  const emailFromState = location.state?.email || "";
  const [email, setEmail] = useState(emailFromState);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleForgetPassword = (e) => {
    e.preventDefault();

    // Validation
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    passwordReset(email)
      .then(() => {
        setSuccessMessage(
          "Password reset email sent! Check your inbox for the reset link."
        );
        toast.success("Password reset email sent!");
        setEmail("");
        setTimeout(() => {
          window.location.href = "https://mail.google.com/mail/u/0/#inbox";
        }, 3000);
      })
      .catch((error) => {
        const errorMsg =
          error.message === "Firebase: Error (auth/user-not-found)."
            ? "No account found with this email"
            : error.message === "Firebase: Error (auth/invalid-email)."
            ? "Invalid email format"
            : error.message;
        setErrors({ form: errorMsg });
        toast.error(errorMsg);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      data-aos="zoom-in-up"
      className="card-body max-w-[600px] mx-auto py-20"
    >
      <FormLoader isLoading={isLoading} message="Sending reset email..." />
      <form onSubmit={handleForgetPassword}>
        <h2 className="font-semibold text-2xl text-center mb-3">
          Forget Your Account
        </h2>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary mt-4 w-full"
          >
            {isLoading ? <ButtonLoader isLoading={true} /> : "Send Reset Email"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default ForgetPassword;