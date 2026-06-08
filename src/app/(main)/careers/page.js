import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Briefcase, MapPin, Clock, Search } from "lucide-react";
import StaggerContainer, { StaggerItem } from "@/components/animations/StaggerContainer";
import SlideUp from "@/components/animations/SlideUp";
import ScaleOnHover from "@/components/animations/ScaleOnHover";

export const metadata = {
  title: "Careers | Ushnik Technologies",
  description: "Join our team of technology experts and innovators. Explore open positions at Ushnik Technologies.",
};

export default async function CareersPage({ searchParams }) {
  const supabase = await createClient();

  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || '';
  const department = resolvedSearchParams?.department || '';
  const location = resolvedSearchParams?.location || '';

  // Start query
  let query = supabase
    .from('jobs')
    .select('*')
    .eq('status', 'open')
    .order('created_at', { ascending: false });

  // Apply basic filters if any
  if (search) {
    query = query.ilike('title', `%${search}%`);
  }
  if (department) {
    query = query.eq('department', department);
  }
  if (location) {
    query = query.eq('location', location);
  }

  const { data: jobs, error } = await query;

  // Get unique departments and locations for filters
  const { data: allJobs } = await supabase.from('jobs').select('department, location').eq('status', 'open');
  const departments = [...new Set(allJobs?.map(j => j.department))].filter(Boolean);
  const locations = [...new Set(allJobs?.map(j => j.location))].filter(Boolean);

  return (
    <div className="bg-brand-gray min-h-screen">
      {/* PAGE HERO */}
      <section className="bg-brand-black text-white pt-32 pb-20 lg:pt-40 lg:pb-28 min-h-[50vh] flex flex-col items-center justify-center">
        <StaggerContainer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <StaggerItem>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6">Join Our Mission</h1>
          </StaggerItem>
          <StaggerItem>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Build the future of enterprise infrastructure, cybersecurity, and AI solutions with a team of passionate innovators.
            </p>
          </StaggerItem>
        </StaggerContainer>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <SlideUp className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
              <h3 className="font-heading font-bold text-lg mb-6">Filter Roles</h3>
              <form className="space-y-6" method="GET" action="/careers">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="search"
                      defaultValue={search}
                      placeholder="Job title..."
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red sm:text-sm"
                    />
                  </div>
                </div>

                {departments.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      name="department"
                      defaultValue={department}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red sm:text-sm"
                    >
                      <option value="">All Departments</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                )}

                {locations.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <select
                      name="location"
                      defaultValue={location}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red sm:text-sm"
                    >
                      <option value="">All Locations</option>
                      {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-brand-red text-white py-2 rounded-md font-medium hover:bg-red-700 transition-colors"
                >
                  Apply Filters
                </button>

                {(search || department || location) && (
                  <Link href="/careers" className="block text-center text-sm text-gray-500 hover:text-brand-red mt-2">
                    Clear Filters
                  </Link>
                )}
              </form>
            </SlideUp>
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4 space-y-4">
            <h2 className="text-2xl font-heading font-bold mb-6">
              {jobs?.length || 0} Open Roles {department && `in ${department}`}
            </h2>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-md">
                Failed to load jobs. Please try again later.
              </div>
            )}

            {!error && (!jobs || jobs.length === 0) ? (
              <div className="bg-white p-10 rounded-xl border border-gray-200 text-center">
                <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No open positions found</h3>
                <p className="text-gray-500">We don't have any openings that match your criteria right now. Check back later!</p>
              </div>
            ) : (
              <StaggerContainer className="space-y-4">
                {jobs?.map((job) => (
                  <StaggerItem key={job.id}>
                    <ScaleOnHover>
                      <Link href={`/careers/${job.id}`} className="block bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-brand-red hover:shadow-md transition-all group">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-heading font-bold text-brand-black group-hover:text-brand-red transition-colors mb-2">
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.department}</span>
                              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {job.employment_type}</span>
                            </div>
                          </div>
                          <div className="flex flex-col sm:items-end gap-2 shrink-0">
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                              {job.experience}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </ScaleOnHover>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
