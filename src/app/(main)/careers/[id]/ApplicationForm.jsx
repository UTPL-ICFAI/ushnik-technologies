"use client";

import { useState } from "react";
import { submitJobApplication } from "../actions";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function ApplicationForm({ jobId, customQuestions = [] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    formData.append("jobId", jobId);

    // Collect custom question answers into a JSON string
    const answers = {};
    customQuestions.forEach((q, index) => {
      answers[q] = formData.get(`custom_q_${index}`);
      formData.delete(`custom_q_${index}`);
    });
    formData.append("answers", JSON.stringify(answers));

    const result = await submitJobApplication(formData);

    if (result.success) {
      setSuccess(true);
      e.target.reset();
    } else {
      setError(result.error || "Failed to submit application. Please try again.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h4 className="text-lg font-bold mb-2">Application Submitted!</h4>
        <p className="text-sm text-gray-600 mb-6">Thank you for applying. Our talent team will review your profile and get back to you shortly.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="text-sm text-brand-red font-semibold hover:underline"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
          {error}
        </div>
      )}

      {/* Candidate Information */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Full Name <span className="text-brand-red">*</span></label>
          <input type="text" name="full_name" required className="w-full text-sm py-2 px-3 border-gray-300 rounded-md focus:border-brand-red focus:ring-brand-red" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email <span className="text-brand-red">*</span></label>
          <input type="email" name="email" required className="w-full text-sm py-2 px-3 border-gray-300 rounded-md focus:border-brand-red focus:ring-brand-red" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Phone <span className="text-brand-red">*</span></label>
          <input type="tel" name="phone" required className="w-full text-sm py-2 px-3 border-gray-300 rounded-md focus:border-brand-red focus:ring-brand-red" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Location <span className="text-brand-red">*</span></label>
            <input type="text" name="current_location" required className="w-full text-sm py-2 px-3 border-gray-300 rounded-md focus:border-brand-red focus:ring-brand-red" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Total Experience <span className="text-brand-red">*</span></label>
            <input type="text" name="experience" placeholder="e.g. 5 Years" required className="w-full text-sm py-2 px-3 border-gray-300 rounded-md focus:border-brand-red focus:ring-brand-red" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Current Company</label>
            <input type="text" name="current_company" className="w-full text-sm py-2 px-3 border-gray-300 rounded-md focus:border-brand-red focus:ring-brand-red" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Current Role</label>
            <input type="text" name="current_designation" className="w-full text-sm py-2 px-3 border-gray-300 rounded-md focus:border-brand-red focus:ring-brand-red" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Notice Period <span className="text-brand-red">*</span></label>
            <input type="text" name="notice_period" required placeholder="e.g. 30 days" className="w-full text-sm py-2 px-3 border-gray-300 rounded-md focus:border-brand-red focus:ring-brand-red" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Expected Salary</label>
            <input type="text" name="expected_salary" className="w-full text-sm py-2 px-3 border-gray-300 rounded-md focus:border-brand-red focus:ring-brand-red" />
          </div>
        </div>
      </div>

      {customQuestions.length > 0 && (
        <div className="border-t border-gray-100 pt-5 space-y-4">
          {customQuestions.map((q, i) => (
            <div key={i}>
              <label className="block text-xs font-medium text-gray-700 mb-1">{q} <span className="text-brand-red">*</span></label>
              <textarea 
                name={`custom_q_${i}`} 
                rows={2}
                required 
                className="w-full text-sm py-2 px-3 border-gray-300 rounded-md focus:border-brand-red focus:ring-brand-red" 
              />
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-gray-100 pt-5 space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Resume (PDF max 5MB) <span className="text-brand-red">*</span></label>
          <input type="file" name="resume" accept=".pdf" required className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Cover Letter (Optional)</label>
          <input type="file" name="cover_letter" accept=".pdf" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100" />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <><Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" /> Submitting...</>
          ) : (
            "Submit Application"
          )}
        </button>
      </div>
    </form>
  );
}
