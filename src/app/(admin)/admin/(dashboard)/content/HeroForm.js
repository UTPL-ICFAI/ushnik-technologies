"use client";

import { useState, useRef } from "react";
import { updateHeroSection } from "./actions";
import { createClient } from "@/utils/supabase/client";
import ImagePlaceholder from "@/components/admin/ImagePlaceholder";

export default function HeroForm({ hero }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [videoUrl, setVideoUrl] = useState(hero.video_url || "");
  const [imageUrl, setImageUrl] = useState(hero.fallback_image_url || "");
  const [isVideo, setIsVideo] = useState(hero.is_video || false);
  const supabase = createClient();
  const fileInputRef = useRef(null);

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('video/')) {
      setMessage({ type: "error", text: "Please select a valid video file." });
      return;
    }

    setLoading(true);
    setMessage({ type: "success", text: "Uploading video..." });
    
    // Create unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `hero/${fileName}`;

    try {
      const { data, error } = await supabase.storage
        .from('videos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: publicData } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath);

      setVideoUrl(publicData.publicUrl);
      setMessage({ type: "success", text: "Video uploaded successfully! Don't forget to save changes." });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Error uploading video: " + error.message });
    } finally {
      setLoading(false);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

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

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center cursor-pointer">
              <input type="hidden" name="is_video_value" value={isVideo.toString()} />
              <input
                type="checkbox"
                name="is_video"
                checked={isVideo}
                onChange={(e) => setIsVideo(e.target.checked)}
                className="w-4 h-4 text-brand-red border-gray-300 rounded focus:ring-brand-red"
              />
              <span className="ml-2 text-sm font-bold text-gray-900">Use Video Background</span>
            </label>
          </div>

          {!isVideo && (
            <div className="mb-4">
              <input type="hidden" name="fallback_image_url" value={imageUrl} />
              <ImagePlaceholder 
                currentImage={imageUrl}
                recommendedSize="1920 x 1080"
                label="Hero Background Image"
                onImageSelected={(file) => {
                  // In a real app, this would upload to Supabase Storage like the video upload does.
                  // For this simplified CMS demo, we create an object URL.
                  setImageUrl(URL.createObjectURL(file));
                }}
                onImageRemoved={() => setImageUrl("")}
              />
            </div>
          )}

          {isVideo && (
            <div className="space-y-3 pl-6 border-l-2 border-brand-red">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Upload New Video (.mp4)</label>
                <input
                  type="file"
                  accept="video/mp4,video/webm"
                  onChange={handleVideoUpload}
                  disabled={loading}
                  ref={fileInputRef}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-red file:text-white hover:file:bg-red-700"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Current Video URL</label>
                <input
                  type="text"
                  name="video_url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red outline-none text-sm bg-white"
                />
              </div>
              
              {videoUrl && (
                <div className="mt-2 relative aspect-video rounded-md overflow-hidden bg-black max-w-sm">
                  <video src={videoUrl} autoPlay muted loop className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">Preview</span>
                  </div>
                </div>
              )}
            </div>
          )}
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
