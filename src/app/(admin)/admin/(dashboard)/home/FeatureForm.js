"use client";

import { useState } from "react";
import { updateFeature, deleteFeature } from "./actions";

export default function FeatureForm({ feature }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.target);
    const result = await updateFeature(formData);

    if (result.success) {
      setMessage({ type: "success", text: "Saved!" });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: "error", text: result.error });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center space-x-4">
      <input type="hidden" name="id" value={feature.id} />
      
      <div className="flex items-center space-x-2">
        <label className="text-xs text-gray-500">Order:</label>
        <input type="number" name="order_index" defaultValue={feature.order_index} className="w-16 px-2 py-1 text-xs border rounded" />
      </div>
      
      <input
        type="text"
        name="text"
        defaultValue={feature.text}
        className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none text-sm"
        required
      />

      <button type="button" onClick={() => deleteFeature(feature.id)} className="text-xs text-red-500 hover:text-red-700 px-3 py-1.5 font-medium">
        Delete
      </button>
      
      <button type="submit" disabled={loading} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded font-medium disabled:opacity-50 whitespace-nowrap">
        {loading ? "..." : "Save"}
      </button>
      
      {message && <span className={`absolute right-4 text-xs font-bold ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</span>}
    </form>
  );
}
