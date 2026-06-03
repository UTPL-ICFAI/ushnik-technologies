import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Infrastructure & Data Center Division | Ushnik Technologies",
  description: "End-to-end infrastructure advisory, cloud optimization, colocation, and IXP ecosystems.",
};

// Dynamic Icon Renderer
function DynamicIcon({ name, className }) {
  const IconComponent = LucideIcons[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

export default async function InfrastructurePage() {
  const supabase = await createClient();

  // Fetch Hero Data
  const { data: heroData } = await supabase
    .from('hero_sections')
    .select('*')
    .eq('page_route', '/infrastructure')
    .single();

  // Fetch Services Data
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('division', 'infrastructure')
    .order('order_index', { ascending: true });

  const heading = heroData?.heading || "Infrastructure & Data Center Division";
  const subheading = heroData?.subheading || "Building the backbone of India's digital future — through carrier-neutral data centers, cloud partnerships, IXP ecosystems, and end-to-end infrastructure advisory.";

  return (
    <div className="bg-brand-gray min-h-screen">
      {/* PAGE HERO */}
      <section className="bg-brand-black text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              <div className="lg:w-1/3 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <DynamicIcon name={service.icon_name} className="h-10 w-10 text-brand-red mb-4" />
                <h2 className="text-2xl font-heading font-bold text-brand-black mb-4">{service.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
              
              <div className="lg:w-2/3">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.bullet_points?.map((item, idx) => (
                    <li key={idx} className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-red mt-2 mr-3"></div>
                      <span className="text-gray-800 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                {service.footer_text && (
                  <div className="mt-6 p-6 bg-brand-black text-white rounded-lg border-l-4 border-brand-red">
                    <p className="text-sm text-gray-300 leading-relaxed">{service.footer_text}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-white py-20 lg:py-28 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-brand-black mb-6">Start With a Free Infrastructure Assessment</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Share your current infrastructure and hosting details to receive a customized infrastructure optimization recommendation from Ushnik Technologies. Our team evaluates cost, performance, scalability, backup, and disaster recovery requirements to suggest more efficient and cost-effective infrastructure options.
          </p>
          <p className="text-gray-800 font-semibold mb-10">
            Whether you are on AWS, Azure, GCP, private cloud, local servers, VPS, or data centers — we can help identify a more efficient and cost-effective solution.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-md text-white bg-brand-red hover:bg-red-700 shadow-lg hover:shadow-xl transition-all"
          >
            Start Free Assessment <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
