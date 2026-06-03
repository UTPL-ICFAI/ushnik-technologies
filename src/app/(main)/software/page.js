import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Software & Technology Services | Ushnik Technologies",
  description: "End-to-end software solutions, product development, cybersecurity, and IT staffing.",
};

// Dynamic Icon Renderer
function DynamicIcon({ name, className }) {
  const IconComponent = LucideIcons[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

export default async function SoftwarePage() {
  const supabase = await createClient();

  // Fetch Hero Data
  const { data: heroData } = await supabase
    .from('hero_sections')
    .select('*')
    .eq('page_route', '/software')
    .single();

  // Fetch Services Data
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('division', 'software')
    .order('order_index', { ascending: true });

  const heading = heroData?.heading || "Software & Technology Services Division";
  const subheading = heroData?.subheading || "End-to-end software solutions — from product development and enterprise applications to cybersecurity support and technology staffing — built for businesses across every industry.";

  return (
    <div className="bg-brand-white min-h-screen">
      {/* PAGE HERO */}
      <section className="bg-brand-black text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6">{heading}</h1>
          <p className="text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            {subheading}
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
          {services?.map((service, index) => (
            <div key={service.id} id={service.id} className={`flex flex-col lg:flex-row gap-8 lg:gap-16 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''} items-start`}>
              <div className="lg:w-1/3 bg-brand-gray p-8 rounded-xl shadow-sm border border-gray-200">
                <DynamicIcon name={service.icon_name} className="h-10 w-10 text-brand-red mb-4" />
                <h2 className="text-2xl font-heading font-bold text-brand-black mb-4">{service.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
              
              <div className="lg:w-2/3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.bullet_points?.map((item, idx) => (
                    <div key={idx} className="flex items-start bg-white p-4 rounded-lg border border-gray-200 hover:border-brand-red transition-colors">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-red mt-2 mr-3"></div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-brand-gray py-20 lg:py-28 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-brand-black mb-6">Need a Technology Partner?</h2>
          <p className="text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Whether you're looking to build a custom application, secure your digital assets, or augment your IT team, we have the expertise to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-md text-white bg-brand-red hover:bg-red-700 shadow-lg hover:shadow-xl transition-all"
            >
              Contact Us <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-md text-brand-black bg-white border border-gray-300 hover:bg-gray-50 shadow-sm transition-all"
            >
              Request Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
