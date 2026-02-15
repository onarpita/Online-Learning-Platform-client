import React, { useState } from "react";

const ContactSupport = () => {
  const [form, setForm] = useState({ email: "", issue: "", details: "" });

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Support request submitted. Our team will reach out shortly.");
    setForm({ email: "", issue: "", details: "" });
  };

  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">Contact Support</h1>
      <p className="mb-6 text-base-content/80">
        Need help with a course or your account? Describe your issue below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm">Issue</label>
          <select
            name="issue"
            value={form.issue}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select issue</option>
            <option value="payment">Payment</option>
            <option value="course_access">Course access</option>
            <option value="technical">Technical problem</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Details</label>
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-32"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Support Request
        </button>
      </form>
    </main>
  );
};

export default ContactSupport;