import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Briefcase, MapPin, Clock, DollarSign, ChevronLeft } from "lucide-react";
import Link from "next/link";
import ApplicationForm from "./ApplicationForm";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  const { data: job } = await supabase.from("jobs").select("title").eq("id", resolvedParams.id).single();
  return {
    title: `${job?.title || 'Job Details'} | Ushnik Technologies`,
    description: `Apply for the ${job?.title} position at Ushnik Technologies.`,
  };
}

export default async function JobDetailsPage({ params }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", resolvedParams.id)
    .eq("status", "open")
    .single();

  if (error || !job) {
    notFound();
  }

  // Parse JSON fields safely
  const requirements = typeof job.requirements === 'string' ? JSON.parse(job.requirements) : job.requirements || [];
  const responsibilities = typeof job.responsibilities === 'string' ? JSON.parse(job.responsibilities) : job.responsibilities || [];
  const benefits = typeof job.benefits === 'string' ? JSON.parse(job.benefits) : job.benefits || [];
  const customQuestions = typeof job.custom_questions === 'string' ? JSON.parse(job.custom_questions) : job.custom_questions || [];

  return (
    <div className="bg-brand-gray min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/careers" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand-red mb-8 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to all jobs
        </Link>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Job Details */}
          <div className="lg:w-2/3 space-y-8">
            <div className="bg-white p-8 lg:p-10 rounded-xl border border-gray-200 shadow-sm">
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-brand-black mb-4">
                {job.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600 mb-8 border-b border-gray-100 pb-8">
                <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-brand-red" /> {job.department}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-brand-red" /> {job.location}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-brand-red" /> {job.employment_type}</span>
                {job.salary_range && <span className="flex items-center gap-1.5"><DollarSign className="h-4 w-4 text-brand-red" /> {job.salary_range}</span>}
              </div>

              <div className="prose max-w-none prose-red">
                <h3 className="text-xl font-bold font-heading mb-4">About the Role</h3>
                <p className="whitespace-pre-wrap text-gray-700 leading-relaxed mb-8">{job.description}</p>

                {responsibilities.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold font-heading mb-4">Key Responsibilities</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-8">
                      {responsibilities.map((req, i) => <li key={i}>{req}</li>)}
                    </ul>
                  </>
                )}

                {requirements.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold font-heading mb-4">Requirements & Qualifications</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-8">
                      {requirements.map((req, i) => <li key={i}>{req}</li>)}
                    </ul>
                  </>
                )}

                {benefits.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold font-heading mb-4">Benefits & Perks</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {benefits.map((req, i) => <li key={i}>{req}</li>)}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Application Form Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 lg:p-8 rounded-xl border border-gray-200 shadow-sm sticky top-24">
              <h3 className="text-xl font-heading font-bold border-b border-gray-100 pb-4 mb-6">Apply for this position</h3>
              <ApplicationForm jobId={job.id} customQuestions={customQuestions} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
