import React, { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: integrate with backend or email service
    alert("Thanks for contacting us — we'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-6 text-base-content/80">
        Have a question? Send us a message.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
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
          <label className="block text-sm">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-32"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send Message
        </button>
      </form>
    </main>
  );
};

export default ContactUs;