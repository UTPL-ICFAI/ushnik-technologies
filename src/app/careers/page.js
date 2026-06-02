import Link from "next/link";
import { Users, Code, Server, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Careers | Ushnik Technologies",
  description: "Join Ushnik Technologies. We are always looking for top talent in software development, cybersecurity, and IT infrastructure.",
};

export default function CareersPage() {
  return (
    <div className="bg-brand-white min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-brand-black mb-6">Join Our Team</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are building a dynamic team of technology professionals to support our infrastructure advisory and software development divisions.
          </p>
        </div>

        <div className="bg-brand-gray p-8 rounded-xl border border-gray-200 mb-12">
          <h2 className="text-2xl font-bold text-brand-black mb-4">IT Staffing & Resource Augmentation</h2>
          <p className="text-gray-600 mb-6">
            In addition to internal roles, our Software Division actively recruits for technology staffing and contract hiring for our enterprise clients. If you are looking for project-based dedicated teams or remote-first placements, submit your profile to our talent pool.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-700 font-medium">
              <Code className="h-5 w-5 text-brand-red mr-3" /> Software Engineers & DevOps
            </div>
            <div className="flex items-center text-sm text-gray-700 font-medium">
              <Server className="h-5 w-5 text-brand-red mr-3" /> Cloud Architects & Network Eng.
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-brand-black mb-4">Currently Open Positions</h2>
          <p className="text-gray-600 mb-8">We are continually evaluating profiles. Send us your resume to be considered for upcoming roles and staffing projects.</p>
          <a href="mailto:contact@ushniktechnologies.com?subject=Careers%20Application" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-red hover:bg-red-700 transition-colors">
            Submit Your Resume <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
