"use client";

import { useState } from "react";
import { updateGlobalSettings } from "./actions";
import toast from "react-hot-toast";

export default function SettingsForm({ initialData }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    
    toast.promise(
      updateGlobalSettings(formData).then(result => {
        if (!result.success) throw new Error(result.error);
        return result;
      }),
      {
        loading: 'Saving settings...',
        success: 'Settings updated successfully!',
        error: (err) => `Failed to save: ${err.message}`,
      }
    ).finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
        <input
          type="text"
          name="company_name"
          defaultValue={initialData?.company_name}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Navbar/Footer Tagline</label>
        <input
          type="text"
          name="tagline"
          defaultValue={initialData?.tagline}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
          <input
            type="email"
            name="contact_email"
            defaultValue={initialData?.contact_email}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
          <input
            type="text"
            name="contact_phone"
            defaultValue={initialData?.contact_phone}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
        <textarea
          name="office_address"
          defaultValue={initialData?.office_address}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
        />
      </div>



      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Footer Copyright Text</label>
        <input
          type="text"
          name="footer_text"
          defaultValue={initialData?.footer_text}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
        />
      </div>

      {/* Animation Settings Section */}
      <div className="pt-6 border-t border-gray-200 space-y-4">
        <h2 className="text-lg font-bold text-brand-black">Animation System</h2>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            name="enable_animations"
            value="true"
            defaultChecked={initialData?.enable_animations ?? true}
            className="w-4 h-4 text-brand-red border-gray-300 rounded focus:ring-brand-red"
          />
          <label className="ml-2 block text-sm text-gray-900 font-medium">
            Enable Master Animations
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="enable_hero_animations"
              value="true"
              defaultChecked={initialData?.enable_hero_animations ?? true}
              className="w-4 h-4 text-brand-red border-gray-300 rounded focus:ring-brand-red"
            />
            <label className="ml-2 block text-sm text-gray-700">Hero Section Animations</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="enable_scroll_reveal"
              value="true"
              defaultChecked={initialData?.enable_scroll_reveal ?? true}
              className="w-4 h-4 text-brand-red border-gray-300 rounded focus:ring-brand-red"
            />
            <label className="ml-2 block text-sm text-gray-700">Scroll Reveal Animations</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="enable_counter_animations"
              value="true"
              defaultChecked={initialData?.enable_counter_animations ?? true}
              className="w-4 h-4 text-brand-red border-gray-300 rounded focus:ring-brand-red"
            />
            <label className="ml-2 block text-sm text-gray-700">Counter Statistics Animations</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="enable_chatbot_animations"
              value="true"
              defaultChecked={initialData?.enable_chatbot_animations ?? true}
              className="w-4 h-4 text-brand-red border-gray-300 rounded focus:ring-brand-red"
            />
            <label className="ml-2 block text-sm text-gray-700">Chatbot Animations</label>
          </div>
        </div>

        <div className="pt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Animation Speed</label>
          <select
            name="animation_speed"
            defaultValue={initialData?.animation_speed || 'normal'}
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none bg-white"
          >
            <option value="fast">Fast (Recommended for Snappy UX)</option>
            <option value="normal">Normal</option>
            <option value="slow">Slow (Dramatic)</option>
          </select>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={loading}
          className="bg-brand-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
