"use client";

import { useState } from "react";
import { updateAboutConfig } from "./actions";
import ImagePlaceholder from "@/components/admin/ImagePlaceholder";

export default function AboutForm({ config }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [imageUrl, setImageUrl] = useState(config?.leadership_image_url || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.target);
    const result = await updateAboutConfig(formData);

    if (result.success) {
      setMessage({ type: "success", text: "Settings saved successfully!" });
    } else {
      setMessage({ type: "error", text: result.error });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <div className={`p-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>
      )}

      {/* CORE TEXT BLOCKS */}
      <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-brand-black border-b pb-2">Core Content</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Who We Are</label>
          <p className="text-xs text-gray-500 mb-2">Supports markdown-style bold text using **text**.</p>
          <textarea
            name="who_we_are_text"
            defaultValue={config?.who_we_are_text}
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none text-sm"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Our Mission</label>
            <textarea
              name="mission_text"
              defaultValue={config?.mission_text}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Our Vision</label>
            <textarea
              name="vision_text"
              defaultValue={config?.vision_text}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none text-sm"
              required
            />
          </div>
        </div>
      </section>

      {/* LISTS */}
      <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-brand-black border-b pb-2">Lists & Tags</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Differentiators (What Makes Us Different)</label>
            <p className="text-xs text-gray-500 mb-2">Enter one feature per line.</p>
            <textarea
              name="differentiators"
              defaultValue={config?.differentiators?.join('\n')}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none text-sm whitespace-pre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ecosystem Tags</label>
            <p className="text-xs text-gray-500 mb-2">Enter one tag per line.</p>
            <textarea
              name="ecosystem_tags"
              defaultValue={config?.ecosystem_tags?.join('\n')}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none text-sm whitespace-pre"
            />
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-brand-black border-b pb-2">Leadership Profile</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="leadership_name"
                defaultValue={config?.leadership_name}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input
                type="text"
                name="leadership_designation"
                defaultValue={config?.leadership_designation}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Profile Text</label>
              <textarea
                name="leadership_bio"
                defaultValue={config?.leadership_bio}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none text-sm"
              />
            </div>
          </div>
          <div>
            <input type="hidden" name="leadership_image_url" value={imageUrl} />
            <ImagePlaceholder 
              currentImage={imageUrl}
              recommendedSize="400 x 400"
              label="Profile Picture"
              onImageSelected={(file) => setImageUrl(URL.createObjectURL(file))}
              onImageRemoved={() => setImageUrl("")}
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-brand-red text-white px-8 py-3 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 font-medium"
        >
          {loading ? "Saving..." : "Save About Us Content"}
        </button>
      </div>
    </form>
  );
}
