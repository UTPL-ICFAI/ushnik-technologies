"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { submitContactForm } from "./actions";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.target);
    const result = await submitContactForm(formData);

    if (result.success) {
      setMessage({ type: "success", text: "Thank you! Your message has been sent successfully." });
      e.target.reset();
    } else {
      setMessage({ type: "error", text: result.error || "Failed to send message." });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input type="text" name="full_name" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-brand-red focus:ring-brand-red outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input type="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-brand-red focus:ring-brand-red outline-none" required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name (Optional)</label>
        <input type="text" name="company" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-brand-red focus:ring-brand-red outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
        <input type="text" name="subject" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-brand-red focus:ring-brand-red outline-none" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
        <textarea name="message" rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-brand-red focus:ring-brand-red outline-none" required></textarea>
      </div>
      <div>
        <button type="submit" disabled={loading} className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-red hover:bg-red-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-50">
          {loading ? "Sending..." : "Send Message"} {!loading && <Send className="ml-2 h-4 w-4" />}
        </button>
      </div>
    </form>
  );
}
