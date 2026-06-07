import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import JobManager from "./JobManager";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function AdminCareerDetailsPage({ params }) {
  const resolvedParams = await params;
  const isNew = resolvedParams.id === "new";
  const supabase = await createClient();

  let job = null;
  let applications = [];

  if (!isNew) {
    const { data: jobData, error: jobError } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", resolvedParams.id)
      .single();

    if (jobError || !jobData) {
      notFound();
    }
    job = jobData;

    const { data: appsData } = await supabase
      .from("job_applications")
      .select("*")
      .eq("job_id", resolvedParams.id)
      .order("created_at", { ascending: false });

    applications = appsData || [];
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/careers" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand-red mb-2 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Careers
        </Link>
        <h1 className="text-2xl font-bold font-heading text-brand-black">
          {isNew ? "Post New Job" : `Manage Job: ${job.title}`}
        </h1>
        <p className="text-gray-500 mt-1">
          {isNew ? "Fill in the details below to create a new job posting." : "Update job details and review applications."}
        </p>
      </div>

      <JobManager initialJob={job} initialApplications={applications} isNew={isNew} />
    </div>
  );
}
