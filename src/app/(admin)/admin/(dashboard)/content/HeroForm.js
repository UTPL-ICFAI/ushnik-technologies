"use client";

import { useState } from "react";
import { updateHeroSection } from "./actions";

export default function HeroForm({ hero }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.target);
    const result = await updateHeroSection(formData);

    if (result.success) {
      setMessage({ type: "success", text: "Updated successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: "error", text: result.error });
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
        <h2 className="text-lg font-bold font-heading text-brand-black">Page: <span className="text-brand-red">{hero.page_route}</span></h2>
        {message && (
          <span className={`text-sm font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message.text}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="id" value={hero.id} />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Heading (H1)</label>
          <input
            type="text"
            name="heading"
            defaultValue={hero.heading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subheading / Description</label>
          <textarea
            name="subheading"
            defaultValue={hero.subheading}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors disabled:opacity-50 text-sm"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
