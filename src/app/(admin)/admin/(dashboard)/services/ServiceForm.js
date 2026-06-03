"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { updateService, deleteService } from "./actions";

export default function ServiceForm({ service }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.target);
    const result = await updateService(formData);

    if (result.success) {
      setMessage({ type: "success", text: "Saved!" });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: "error", text: result.error });
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this service? This action cannot be undone.")) return;
    
    setLoading(true);
    setMessage(null);

    const result = await deleteService(service.id);

    if (result.success) {
      // The component will unmount as revalidatePath runs, but in case it's slow:
      setMessage({ type: "success", text: "Deleted!" });
    } else {
      setMessage({ type: "error", text: result.error });
      setLoading(false);
    }
  };

  // Convert array to newline separated string for text area
  const initialBullets = service.bullet_points ? service.bullet_points.join("\n") : "";

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
        <h2 className="text-lg font-bold font-heading text-brand-black">{service.title}</h2>
        {message && (
          <span className={`text-sm font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message.text}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="id" value={service.id} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={service.title}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icon Name (Lucide React)</label>
            <input
              type="text"
              name="icon_name"
              defaultValue={service.icon_name}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none font-mono text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={service.description}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bullet Points (One per line)</label>
          <textarea
            name="bullet_points"
            defaultValue={initialBullets}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Footer Text (Optional)</label>
          <textarea
            name="footer_text"
            defaultValue={service.footer_text || ""}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none"
          />
        </div>

        <div className="pt-2 flex justify-between items-center">
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center text-red-600 hover:text-red-800 transition-colors text-sm font-medium disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors disabled:opacity-50 text-sm"
          >
            {loading ? "Saving..." : "Save Service"}
          </button>
        </div>
      </form>
    </div>
  );
}
