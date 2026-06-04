"use client";

import { useState } from "react";
import { updateCapability, deleteCapability } from "./actions";

export default function CapabilityForm({ capability }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.target);
    const result = await updateCapability(formData);

    if (result.success) {
      setMessage({ type: "success", text: "Saved!" });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: "error", text: result.error });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-gray-400">Capability Card</span>
        {message && <span className={`text-xs font-bold ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</span>}
      </div>
      <input type="hidden" name="id" value={capability.id} />
      
      <div className="flex items-center space-x-2 mb-2">
        <label className="text-xs text-gray-500">Order:</label>
        <input type="number" name="order_index" defaultValue={capability.order_index} className="w-16 px-2 py-1 text-xs border rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={capability.title}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Icon Name (Lucide React)</label>
          <input
            type="text"
            name="icon_name"
            defaultValue={capability.icon_name}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none text-sm font-mono"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
        <textarea
          name="description"
          defaultValue={capability.description}
          rows={2}
          className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none text-sm"
          required
        />
      </div>
      <div className="flex justify-between mt-4">
        <button type="button" onClick={() => deleteCapability(capability.id)} className="text-xs text-red-500 hover:text-red-700 px-3 py-1.5 font-medium flex items-center">
          Delete
        </button>
        <button type="submit" disabled={loading} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded font-medium disabled:opacity-50">
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
