"use client";

import { useState } from "react";
import { saveJob, updateApplicationStatus, deleteApplication, deleteJob } from "../actions";
import { useRouter } from "next/navigation";
import { Loader2, Download, ExternalLink, Trash2, Edit3 } from "lucide-react";

export default function JobManager({ initialJob, initialApplications, isNew }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [isEditing, setIsEditing] = useState(isNew);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Parse JSON arrays for textareas
  const safeJoin = (data) => {
    if (!data) return "";
    if (typeof data === "string") {
      try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed.join("\n") : data;
      } catch {
        return data;
      }
    }
    if (Array.isArray(data)) return data.join("\n");
    return "";
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    formData.append("isNew", isNew);
    if (!isNew) formData.append("id", initialJob.id);

    const res = await saveJob(formData);
    if (res.success) {
      if (isNew) {
        router.push(`/admin/careers/${res.jobId}`);
      } else {
        alert("Job updated successfully!");
        setIsEditing(false);
        router.refresh();
      }
    } else {
      setError(res.error);
    }
    setLoading(false);
  };

  const handleStatusChange = async (appId, newStatus) => {
    const res = await updateApplicationStatus(appId, newStatus);
    if (res.success) {
      alert("Status updated");
      router.refresh();
    } else {
      alert(res.error);
    }
  };

  const handleDelete = async (appId) => {
    if (confirm("Are you sure you want to permanently delete this application?")) {
      const res = await deleteApplication(appId);
      if (res.success) {
        alert("Application deleted");
        router.refresh();
      } else {
        alert(res.error);
      }
    }
  };

  const handleDeleteJob = async () => {
    if (confirm("Are you sure you want to delete this entire job posting? This will also delete all associated applications.")) {
      const res = await deleteJob(initialJob.id);
      if (res.success) {
        alert("Job deleted");
        router.push("/admin/careers");
      } else {
        alert(res.error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px px-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("details")}
            className={`${activeTab === "details" ? "border-brand-red text-brand-red" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8`}
          >
            Job Details
          </button>
          {!isNew && (
            <button
              onClick={() => setActiveTab("applicants")}
              className={`${activeTab === "applicants" ? "border-brand-red text-brand-red" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              Applicants 
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs">{initialApplications.length}</span>
            </button>
          )}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === "details" && !isEditing && initialJob && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h3 className="text-2xl font-bold font-heading">{initialJob.title}</h3>
                <p className="text-gray-500 mt-1">{initialJob.department} • {initialJob.location}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                  <Edit3 className="h-4 w-4" /> Edit Job
                </button>
                <button onClick={handleDeleteJob} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm font-medium hover:bg-red-100 transition-colors">
                  <Trash2 className="h-4 w-4" /> Delete Job
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div><span className="text-gray-500 block text-xs mb-1">Status</span><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${initialJob.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{initialJob.status}</span></div>
              <div><span className="text-gray-500 block text-xs mb-1">Experience</span><span className="text-sm font-medium">{initialJob.experience}</span></div>
              <div><span className="text-gray-500 block text-xs mb-1">Employment Type</span><span className="text-sm font-medium">{initialJob.employment_type}</span></div>
              <div><span className="text-gray-500 block text-xs mb-1">Salary Range</span><span className="text-sm font-medium">{initialJob.salary_range || "N/A"}</span></div>
            </div>

            <div className="prose max-w-none prose-sm">
              <h4 className="text-lg font-bold">Job Description</h4>
              <p className="whitespace-pre-wrap text-gray-700">{initialJob.description}</p>
            </div>
          </div>
        )}

        {activeTab === "details" && isEditing && (
          <form onSubmit={handleSave} className="space-y-6">
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                <input type="text" name="title" defaultValue={initialJob?.title} required className="w-full border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                <input type="text" name="department" defaultValue={initialJob?.department} required className="w-full border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input type="text" name="location" defaultValue={initialJob?.location} required className="w-full border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience *</label>
                <input type="text" name="experience" defaultValue={initialJob?.experience} placeholder="e.g. 3-5 Years" required className="w-full border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type *</label>
                <select name="employment_type" defaultValue={initialJob?.employment_type || "Full-time"} className="w-full border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red sm:text-sm">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                <input type="text" name="salary_range" defaultValue={initialJob?.salary_range} placeholder="e.g. ₹10L - ₹15L" className="w-full border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                <select name="status" defaultValue={initialJob?.status || "open"} className="w-full border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red sm:text-sm">
                  <option value="open">Open (Visible to public)</option>
                  <option value="draft">Draft (Hidden)</option>
                  <option value="closed">Closed (Hidden)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
              <textarea name="description" defaultValue={initialJob?.description} rows={5} required className="w-full border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red sm:text-sm" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (One per line)</label>
                <textarea name="requirements" defaultValue={safeJoin(initialJob?.requirements)} rows={4} className="w-full border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red sm:text-sm" placeholder="Bachelor's degree in CS&#10;3+ years of React experience" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities (One per line)</label>
                <textarea name="responsibilities" defaultValue={safeJoin(initialJob?.responsibilities)} rows={4} className="w-full border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (One per line)</label>
                <textarea name="benefits" defaultValue={safeJoin(initialJob?.benefits)} rows={4} className="w-full border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Screening Questions (One per line)</label>
                <textarea name="custom_questions" defaultValue={safeJoin(initialJob?.custom_questions)} rows={4} className="w-full border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red sm:text-sm" placeholder="Why do you want to work here?&#10;Link to your portfolio?" />
                <p className="text-xs text-gray-500 mt-1">These will appear as required text inputs on the application form.</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              {!isNew && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-red hover:bg-red-700 disabled:opacity-50"
              >
                {loading && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />}
                {isNew ? "Publish Job" : "Save Changes"}
              </button>
            </div>
          </form>
        )}

        {activeTab === "applicants" && (
          <div className="space-y-6">
            {initialApplications.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No applications received yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {initialApplications.map(app => (
                  <div key={app.id} className="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">{app.full_name}</h4>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <a href={`mailto:${app.email}`} className="hover:text-brand-red">{app.email}</a> • 
                            <a href={`tel:${app.phone}`} className="hover:text-brand-red">{app.phone}</a>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-400 block mb-1">Applied: {new Date(app.created_at).toLocaleDateString()}</span>
                          <select 
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                            className="text-sm font-medium border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red py-1 pl-3 pr-8"
                          >
                            <option>Applied</option>
                            <option>Screening</option>
                            <option>Interview Scheduled</option>
                            <option>Technical Round</option>
                            <option>HR Round</option>
                            <option>Offered</option>
                            <option>Hired</option>
                            <option>Rejected</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm bg-gray-50 p-4 rounded-md border border-gray-100">
                        <div><span className="text-gray-500 block text-xs">Experience</span>{app.experience}</div>
                        <div><span className="text-gray-500 block text-xs">Current Role</span>{app.current_designation || "N/A"}</div>
                        <div><span className="text-gray-500 block text-xs">Notice Period</span>{app.notice_period}</div>
                        <div><span className="text-gray-500 block text-xs">Location</span>{app.current_location}</div>
                      </div>

                      {app.answers && Object.keys(app.answers).length > 0 && (
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Screening Answers</h5>
                          <div className="space-y-3 bg-gray-50 p-4 rounded-md border border-gray-100">
                            {Object.entries(app.answers).map(([q, a], i) => (
                              <div key={i}>
                                <p className="text-xs font-medium text-gray-700">{q}</p>
                                <p className="text-sm text-gray-900 mt-1">{a}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-48 flex flex-col gap-2 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
                      <a 
                        href={app.resume_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-brand-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
                      >
                        <Download className="h-4 w-4" /> View Resume
                      </a>
                      {app.cover_letter_url && (
                        <a 
                          href={app.cover_letter_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" /> Cover Letter
                        </a>
                      )}
                      {app.status === "Rejected" && (
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="flex items-center justify-center gap-2 mt-auto bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-md text-sm hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" /> Delete Candidate
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
