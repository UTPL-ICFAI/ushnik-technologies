"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { insertService } from "./actions";

export default function CreateServiceWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.target);
    const result = await insertService(formData);

    if (result.success) {
      setMessage({ type: "success", text: "Service created successfully!" });
      e.target.reset();
      setTimeout(() => {
        setMessage(null);
        setIsOpen(false);
      }, 2000);
    } else {
      setMessage({ type: "error", text: result.error });
    }

    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="mb-8 inline-flex items-center px-4 py-2 bg-brand-red text-white text-sm font-bold rounded-md hover:bg-red-700 transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4 mr-2" /> Add New Service
      </button>
    );
  }

  return (
    <div className="bg-brand-gray rounded-lg border border-gray-200 shadow-sm p-6 mb-8 relative">
      <button 
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-brand-red transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="mb-4 border-b border-gray-200 pb-4 pr-8">
        <h2 className="text-lg font-bold font-heading text-brand-black">Create New Service</h2>
        {message && (
          <div className={`mt-3 p-3 rounded-md text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message.text}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
          <select 
            name="division" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
            required
          >
            <option value="infrastructure">Infrastructure</option>
            <option value="software">Software</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icon Name (Lucide React)</label>
            <input
              type="text"
              name="icon_name"
              placeholder="e.g. Server, Cloud, Shield"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none font-mono text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bullet Points (One per line)</label>
          <textarea
            name="bullet_points"
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Footer Text (Optional)</label>
          <textarea
            name="footer_text"
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-red text-white font-bold px-6 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 text-sm shadow-sm"
          >
            {loading ? "Creating..." : "Create Service"}
          </button>
        </div>
      </form>
    </div>
  );
}
