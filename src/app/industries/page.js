import Link from "next/link";
import { Briefcase, Building, ShoppingCart, Activity, ShieldCheck, HeartPulse, GraduationCap, Zap } from "lucide-react";

export const metadata = {
  title: "Industries We Serve | Ushnik Technologies",
  description: "Ushnik Technologies serves enterprises and startups across all major industry verticals with customized hardware and software solutions.",
};

const INDUSTRIES = [
  {
    name: "Banking, Financial Services & Insurance (BFSI)",
    icon: <Briefcase className="h-8 w-8 text-brand-red mb-4" />,
    description: "Secure cloud infrastructure, DR solutions, compliance consulting, core banking software support, cybersecurity."
  },
  {
    name: "Healthcare & Life Sciences",
    icon: <HeartPulse className="h-8 w-8 text-brand-red mb-4" />,
    description: "HIPAA-aligned infrastructure, hospital management systems, telemedicine platforms, data security."
  },
  {
    name: "Manufacturing & Industrial",
    icon: <Building className="h-8 w-8 text-brand-red mb-4" />,
    description: "ERP implementation, OT/IT convergence, plant connectivity, industrial IoT infrastructure, logistics software."
  },
  {
    name: "Retail & E-Commerce",
    icon: <ShoppingCart className="h-8 w-8 text-brand-red mb-4" />,
    description: "Scalable cloud infrastructure, e-commerce platform development, CDN optimization, omnichannel solutions."
  },
  {
    name: "Telecommunications & ISPs",
    icon: <ShieldCheck className="h-8 w-8 text-brand-red mb-4" />,
    description: "Network infrastructure advisory, carrier interconnection, IXP peering, colocation, DC partnerships."
  },
  {
    name: "IT & Technology Companies",
    icon: <Activity className="h-8 w-8 text-brand-red mb-4" />,
    description: "Cloud cost optimization, DevOps setup, SaaS infrastructure, co-location, managed services."
  },
  {
    name: "Government & Public Sector",
    icon: <ShieldCheck className="h-8 w-8 text-brand-red mb-4" />,
    description: "Secure data center solutions, NIC connectivity, e-governance platform support, compliance frameworks."
  },
  {
    name: "Education & EdTech",
    icon: <GraduationCap className="h-8 w-8 text-brand-red mb-4" />,
    description: "Learning management systems, scalable cloud hosting, video streaming infrastructure, student platforms."
  },
  {
    name: "Logistics & Supply Chain",
    icon: <Building className="h-8 w-8 text-brand-red mb-4" />,
    description: "Fleet management software, real-time tracking platforms, warehouse management systems, cloud hosting."
  },
  {
    name: "Energy & Utilities",
    icon: <Zap className="h-8 w-8 text-brand-red mb-4" />,
    description: "SCADA system support, infrastructure resilience, backup & DR, industrial network design."
  },
  {
    name: "Real Estate & Construction",
    icon: <Building className="h-8 w-8 text-brand-red mb-4" />,
    description: "Property management software, BIM integration, smart building infrastructure, project management tools."
  },
  {
    name: "Media & Entertainment",
    icon: <Activity className="h-8 w-8 text-brand-red mb-4" />,
    description: "Video streaming infrastructure, content delivery (CDN), OTT platform development, storage solutions."
  },
  {
    name: "Startups & New Businesses",
    icon: <Briefcase className="h-8 w-8 text-brand-red mb-4" />,
    description: "MVP development, affordable cloud setup, infrastructure planning from scratch, product development."
  },
  {
    name: "Hair, Beauty & Lifestyle",
    icon: <HeartPulse className="h-8 w-8 text-brand-red mb-4" />,
    description: "Product development platforms, e-commerce websites, brand tech solutions, inventory management."
  },
  {
    name: "Professional Services",
    icon: <Briefcase className="h-8 w-8 text-brand-red mb-4" />,
    description: "Document management systems, secure hosting, client portal development, compliance tools."
  },
  {
    name: "Hospitality & Tourism",
    icon: <ShoppingCart className="h-8 w-8 text-brand-red mb-4" />,
    description: "Booking platform development, property management software, cloud hosting, guest experience apps."
  }
];

export default function IndustriesPage() {
  return (
    <div className="bg-brand-gray min-h-screen pb-20">
      {/* PAGE HERO */}
      <section className="bg-brand-black text-white py-16 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6">Industries We Serve</h1>
          <p className="text-lg lg:text-xl text-gray-400 leading-relaxed">
            Ushnik Technologies serves enterprises, startups, and new business setups across hardware and software requirements — supporting organizations at every stage of their technology journey across all major industry verticals.
          </p>
        </div>
      </section>

      {/* GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {INDUSTRIES.map((ind, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-brand-red hover:shadow-md transition-all group">
              {ind.icon}
              <h3 className="text-lg font-bold text-brand-black mb-3">{ind.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
                {ind.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-brand-black mb-4">Don't see your industry?</h2>
        <p className="text-gray-600 mb-8">We provide custom solutions tailored to unique business models and niches. Contact us to discuss your specific requirements.</p>
        <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-red hover:bg-red-700 transition-colors">
          Discuss Your Project
        </Link>
      </section>
    </div>
  );
}
