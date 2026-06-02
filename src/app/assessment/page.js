"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function AssessmentForm() {
  const [requirementType, setRequirementType] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for EmailJS or Webhook integration
    console.log("Form Submitted");
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-brand-gray min-h-screen py-20 flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-xl shadow-lg max-w-lg text-center border-t-4 border-brand-red">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-heading font-bold text-brand-black mb-4">Request Submitted Successfully!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for reaching out to Ushnik Technologies. Our infrastructure advisory team will review your details and contact you shortly.
          </p>
          <button
            onClick={() => { setIsSubmitted(false); setRequirementType(""); }}
            className="text-brand-red font-semibold hover:underline"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-gray min-h-screen pb-20">
      {/* PAGE HEADER */}
      <section className="bg-brand-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-4">Infrastructure Assessment & Optimization Request</h1>
          <p className="text-gray-400">
            Fill out this form to receive a personalized infrastructure recommendation from Ushnik Technologies. This assessment is free and non-binding.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 sm:p-10">
            
            {/* ENTRY QUESTION */}
            <div className="mb-10">
              <label className="block text-lg font-heading font-bold text-brand-black mb-4">
                What best describes your requirement? <span className="text-brand-red">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="requirementType"
                    value="new"
                    checked={requirementType === "new"}
                    onChange={(e) => setRequirementType(e.target.value)}
                    className="h-5 w-5 text-brand-red focus:ring-brand-red border-gray-300"
                    required
                  />
                  <span className="ml-3 text-gray-800 font-medium">Setting Up Infrastructure for a New Business / First-Time Deployment</span>
                </label>
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="requirementType"
                    value="existing"
                    checked={requirementType === "existing"}
                    onChange={(e) => setRequirementType(e.target.value)}
                    className="h-5 w-5 text-brand-red focus:ring-brand-red border-gray-300"
                  />
                  <span className="ml-3 text-gray-800 font-medium">Optimizing or Migrating Existing Infrastructure</span>
                </label>
              </div>
            </div>

            {/* CONDITIONAL SECTION A: EXISTING */}
            {requirementType === "existing" && (
              <div className="space-y-8 mb-10 p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-xl font-heading font-bold text-brand-black border-b pb-2">Section A: Existing Infrastructure Details</h3>
                
                <div>
                  <label className="block font-medium text-gray-800 mb-3">A1. Current Infrastructure Provider(s)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {["AWS", "Microsoft Azure", "Google Cloud (GCP)", "Oracle Cloud", "DigitalOcean", "Colocation / Data Center", "On-Premise", "Other"].map(opt => (
                      <label key={opt} className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-red focus:ring-brand-red border-gray-300 mr-2" />
                        <span className="text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block font-medium text-gray-800 mb-3">A2. Current Deployment Model(s)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {["Public Cloud", "Private Cloud", "Hybrid Cloud", "On-Premise", "Colocation", "VPS", "Bare Metal"].map(opt => (
                      <label key={opt} className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-red focus:ring-brand-red border-gray-300 mr-2" />
                        <span className="text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-800 mb-3">A3. Key Pain Points</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {["High monthly cost", "Poor performance / latency", "Frequent downtime", "No DR / backup solution", "Lack of scalability", "Security / compliance concerns"].map(opt => (
                      <label key={opt} className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-red focus:ring-brand-red border-gray-300 mr-2" />
                        <span className="text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-800 mb-3">A4. Current Monthly Infrastructure Spend</label>
                  <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-brand-red focus:ring-brand-red">
                    <option value="">Select Range</option>
                    <option>{"<"} ₹25,000</option>
                    <option>₹25,000–₹1L</option>
                    <option>₹1L–₹5L</option>
                    <option>₹5L+</option>
                    <option>Prefer Not to Say</option>
                  </select>
                </div>
              </div>
            )}

            {/* CONDITIONAL SECTION B: NEW */}
            {requirementType === "new" && (
              <div className="space-y-8 mb-10 p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-xl font-heading font-bold text-brand-black border-b pb-2">Section B: New Deployment Details</h3>
                
                <div>
                  <label className="block font-medium text-gray-800 mb-3">B1. Type of Application / Workload</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {["Website / Web App", "SaaS Platform", "Mobile App Backend", "AI / ML Workloads", "ERP / CRM", "Video / Streaming", "Data Storage", "Not Sure Yet"].map(opt => (
                      <label key={opt} className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-red focus:ring-brand-red border-gray-300 mr-2" />
                        <span className="text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-800 mb-3">B2. Expected Number of Users</label>
                  <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-brand-red focus:ring-brand-red">
                    <option value="">Select Range</option>
                    <option>{"<"} 100</option>
                    <option>100–1,000</option>
                    <option>1,000–10,000</option>
                    <option>10,000+</option>
                    <option>Not Sure</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-gray-800 mb-3">B3. Support Needed For</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {["Infrastructure Architecture / HLD", "Cloud Setup", "Colocation Setup", "Backup & DR Planning", "Network Architecture", "Security Design"].map(opt => (
                      <label key={opt} className="flex items-center">
                        <input type="checkbox" className="rounded text-brand-red focus:ring-brand-red border-gray-300 mr-2" />
                        <span className="text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CONTACT DETAILS (Always shown if requirementType is selected) */}
            {requirementType && (
              <>
                <div className="space-y-6 mb-10">
                  <h3 className="text-xl font-heading font-bold text-brand-black border-b pb-2">Contact Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-brand-red">*</span></label>
                      <input type="text" required className="w-full border-gray-300 rounded-md shadow-sm focus:border-brand-red focus:ring-brand-red" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name <span className="text-brand-red">*</span></label>
                      <input type="text" required className="w-full border-gray-300 rounded-md shadow-sm focus:border-brand-red focus:ring-brand-red" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-brand-red">*</span></label>
                      <input type="email" required className="w-full border-gray-300 rounded-md shadow-sm focus:border-brand-red focus:ring-brand-red" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-brand-red">*</span></label>
                      <input type="tel" required className="w-full border-gray-300 rounded-md shadow-sm focus:border-brand-red focus:ring-brand-red" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                      <input type="text" className="w-full border-gray-300 rounded-md shadow-sm focus:border-brand-red focus:ring-brand-red" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City / Location <span className="text-brand-red">*</span></label>
                      <input type="text" required className="w-full border-gray-300 rounded-md shadow-sm focus:border-brand-red focus:ring-brand-red" />
                    </div>
                  </div>
                </div>

                {/* TERMS & CONDITIONS */}
                <div className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-bold text-sm text-gray-800 mb-2 uppercase tracking-wide">COMMERCIALS, CONSULTATION & ENGAGEMENT TERMS</h4>
                  <div className="text-xs text-gray-600 space-y-3 mb-4 h-32 overflow-y-auto pr-2 custom-scrollbar">
                    <p>I understand and acknowledge that submission of this assessment form is intended for preliminary infrastructure understanding, requirement evaluation, and solution suitability assessment by Ushnik Technologies.</p>
                    <p>I understand that any post-submission consultation, detailed technical discussions, infrastructure advisory, architecture reviews, HLD/LLD preparation, cloud or data center planning, migration planning, cost optimization studies, deployment support, backup/DR planning, onsite visits, implementation assistance, or any other professional services requested from Ushnik Technologies may be chargeable based on the scope of work, technical complexity, infrastructure usage, deployment requirements, service type, project location, and overall engagement effort involved.</p>
                    <p>I further understand that commercials and service charges may vary for different services and requirements and shall be communicated separately through official email or authorized communication channels of Ushnik Technologies. Submission of this form does not constitute any commercial commitment or obligation from either party. Post assessment and requirement evaluation, suitable commercial proposals and service recommendations may be provided by Ushnik Technologies. Any paid engagement, consulting, implementation support, or service execution shall proceed only upon mutual agreement, commercial acceptance, and formal confirmation between both parties through appropriate documentation or official communication.</p>
                  </div>
                  <label className="flex items-start">
                    <input type="checkbox" required className="mt-1 rounded text-brand-red focus:ring-brand-red border-gray-300 mr-3" />
                    <span className="text-sm text-gray-800 font-medium">I agree to the Commercials, Consultation & Engagement Terms above. <span className="text-brand-red">*</span></span>
                  </label>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-md text-white bg-brand-red hover:bg-red-700 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                  >
                    Submit Assessment Request <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </>
            )}

          </form>
        </div>
      </section>
    </div>
  );
}
