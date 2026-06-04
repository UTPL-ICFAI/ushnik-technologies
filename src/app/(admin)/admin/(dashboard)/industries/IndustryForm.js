"use client";

import { useState } from "react";
import { updateIndustry, deleteIndustry } from "./actions";

export default function IndustryForm({ industry }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.target);
    const result = await updateIndustry(formData);

    if (result.success) {
      setMessage({ type: "success", text: "Saved!" });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: "error", text: result.error });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <span className="text-sm font-bold text-gray-700">Industry Card</span>
        {message && <span className={`text-xs font-bold ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</span>}
      </div>
      
      <input type="hidden" name="id" value={industry.id} />
      
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-500 mb-1">Industry Name</label>
          <input
            type="text"
            name="name"
            defaultValue={industry.name}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none text-sm"
            required
          />
        </div>
        <div className="w-24">
          <label className="block text-xs font-medium text-gray-500 mb-1">Order Index</label>
          <input 
            type="number" 
            name="order_index" 
            defaultValue={industry.order_index} 
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-brand-red text-sm" 
          />
        </div>
        <div className="w-32">
          <label className="block text-xs font-medium text-gray-500 mb-1">Lucide Icon Name</label>
          <input 
            type="text" 
            name="icon_name" 
            defaultValue={industry.icon_name} 
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-brand-red text-sm" 
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
        <textarea
          name="description"
          defaultValue={industry.description}
          rows={3}
          className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none text-sm"
          required
        />
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={() => deleteIndustry(industry.id)} className="text-xs text-red-500 hover:text-red-700 font-medium">
          Delete Industry
        </button>
        
        <button type="submit" disabled={loading} className="text-xs bg-brand-black hover:bg-gray-800 text-white px-4 py-2 rounded font-medium disabled:opacity-50">
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
