"use client";

import { useState } from "react";
import ImagePlaceholder from "@/components/admin/ImagePlaceholder";
import { updateSectionImage } from "./actions";

export default function SectionImageForm({ sectionId, initialImageUrl, label = "Section Image" }) {
  const [imageUrl, setImageUrl] = useState(initialImageUrl || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const result = await updateSectionImage(sectionId, imageUrl);
      if (result?.success) {
        setMessage({ type: "success", text: "Saved!" });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: "error", text: result?.error || "Unknown error" });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: error.message || "An unexpected error occurred. Image may be too large." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-gray-700">{label}</span>
        {message && <span className={`text-xs font-bold ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</span>}
      </div>

      <ImagePlaceholder 
        currentImage={imageUrl}
        recommendedSize="800 x 600"
        label="Upload main image"
        onImageSelected={(file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageUrl(reader.result);
          };
          reader.readAsDataURL(file);
        }}
        onImageRemoved={() => setImageUrl("")}
      />

      <div className="flex justify-end pt-2">
        <button 
          type="button" 
          onClick={handleSave}
          disabled={loading} 
          className="text-sm bg-brand-black text-white px-4 py-2 rounded-md font-medium disabled:opacity-50 hover:bg-gray-800 transition-colors"
        >
          {loading ? "Saving..." : "Save Image"}
        </button>
      </div>
    </div>
  );
}
