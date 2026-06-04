"use client";

import { useState } from "react";
import { UploadCloud, Image as ImageIcon, X, RefreshCw } from "lucide-react";

export default function ImagePlaceholder({ 
  currentImage, 
  onImageSelected, 
  onImageRemoved,
  recommendedSize = "1920 x 1080",
  label = "Section Image"
}) {
  const [preview, setPreview] = useState(currentImage || null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a local object URL for preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    if (onImageSelected) {
      onImageSelected(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (onImageRemoved) {
      onImageRemoved();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-500">{label}</label>
      
      {!preview ? (
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors bg-gray-50">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
          <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
          <span className="text-sm font-medium text-brand-black">Upload Image</span>
          <span className="text-xs text-gray-400 mt-1">Recommended: {recommendedSize}</span>
        </div>
      ) : (
        <div className="relative border border-gray-200 rounded-lg overflow-hidden group">
          {/* Image Preview */}
          <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            
            {/* Hover Controls */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
              <label className="cursor-pointer flex items-center px-3 py-1.5 bg-white text-gray-800 rounded text-xs font-medium hover:bg-gray-100">
                <RefreshCw className="w-3 h-3 mr-1" /> Replace
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              
              <button 
                type="button" 
                onClick={handleRemove}
                className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700"
              >
                <X className="w-3 h-3 mr-1" /> Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
