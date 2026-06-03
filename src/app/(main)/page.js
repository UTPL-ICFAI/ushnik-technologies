import Link from "next/link";
import { Server, Code, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: heroData } = await supabase
    .from('hero_sections')
    .select('*')
    .eq('page_route', '/')
    .single();

  const heading = heroData?.heading || "Strategic Technology & Infrastructure Partner for the Evolving Digital Economy";
  const subheading = heroData?.subheading || "Connecting enterprises, cloud ecosystems, and technology partners to unlock scalable growth opportunities across infrastructure, software, and digital services.";

  return (
    <>
      {/* HERO SECTION - TAGLINE */}
      <section className="bg-brand-black text-white pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight mb-6 max-w-5xl mx-auto leading-tight sm:leading-tight md:leading-tight lg:leading-tight text-balance">
            {heading}
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto font-body">
            {subheading}
          </p>
        </div>
      </section>

      {/* FULL WIDTH SPLIT SCREEN - TWO DIVISIONS */}
      <section className="flex flex-col lg:flex-row w-full min-h-[50vh]">
        {/* Left Card: Infrastructure */}
        <Link 
          href="/infrastructure" 
          className="lg:w-1/2 bg-brand-black text-white p-12 lg:p-24 flex flex-col justify-center items-center text-center group hover:bg-[#111] transition-colors border-t lg:border-t-0 border-gray-800 cursor-pointer relative overflow-hidden"
        >
          {/* Subtle accent line on hover */}
          <div className="absolute inset-y-0 left-0 w-1 bg-brand-red transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
          
          <Server className="h-16 w-16 text-brand-red mb-8 transform group-hover:scale-110 transition-transform duration-300" />
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">Infrastructure & Data Center</h2>
          <p className="text-lg lg:text-xl text-gray-400 mb-10 max-w-md leading-relaxed">
            Cloud · Colocation · DC Partnerships · IXP · Digital Infrastructure
          </p>
          <span className="inline-flex items-center px-6 py-3 border-2 border-brand-red text-brand-red font-bold text-sm lg:text-base rounded-md group-hover:bg-brand-red group-hover:text-white transition-all">
            Explore Infrastructure Services <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        {/* Right Card: Software */}
        <Link 
          href="/software" 
          className="lg:w-1/2 bg-brand-white text-brand-black p-12 lg:p-24 flex flex-col justify-center items-center text-center group hover:bg-gray-50 transition-colors border-t lg:border-t-0 border-gray-200 cursor-pointer relative overflow-hidden"
        >
          {/* Subtle accent line on hover */}
          <div className="absolute inset-y-0 right-0 w-1 bg-brand-red transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
          
          <Code className="h-16 w-16 text-brand-red mb-8 transform group-hover:scale-110 transition-transform duration-300" />
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">Software & Technology Services</h2>
          <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-md leading-relaxed">
            Product Development · Cybersecurity · Staffing · IT Solutions
          </p>
          <span className="inline-flex items-center px-6 py-3 border-2 border-brand-red text-brand-red font-bold text-sm lg:text-base rounded-md group-hover:bg-brand-red group-hover:text-white transition-all">
            Explore Software Services <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </section>

      {/* TRUST BAR */}
      <section className="bg-brand-gray py-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-x divide-gray-300">
            <div className="px-4">
              <p className="text-3xl font-bold text-brand-black">10+ Years</p>
              <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">Industry Experience</p>
            </div>
            <div className="px-4 border-l-0 md:border-l">
              <p className="text-3xl font-bold text-brand-black">50+ Clients</p>
              <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">Enterprises Served</p>
            </div>
            <div className="px-4">
              <p className="text-3xl font-bold text-brand-black">20+ Partners</p>
              <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">DC & Cloud Partners</p>
            </div>
            <div className="px-4 border-l-0 md:border-l">
              <p className="text-3xl font-bold text-brand-black">Pan-India</p>
              <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">Service Coverage</p>
            </div>
            <div className="px-4 col-span-2 md:col-span-1 border-l-0 md:border-l">
              <p className="text-3xl font-bold text-brand-black">Global Reach</p>
              <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">Collaborations</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE ENABLE SECTION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-brand-red font-bold tracking-wide uppercase text-sm mb-2">Capabilities</h2>
            <h3 className="text-3xl lg:text-4xl font-heading font-bold text-brand-black">What We Enable</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                title: "Global Business Collaborations",
                desc: "Facilitating strategic partnerships between enterprises, technology providers, and data center operators worldwide."
              },
              {
                title: "Enterprise & Client Connects",
                desc: "Bridging the gap between infrastructure needs and the right technology partners for seamless delivery."
              },
              {
                title: "Strategic Partnership Opportunities",
                desc: "Creating joint venture, colocation, and distribution partnerships across the cloud and data center ecosystem."
              },
              {
                title: "Data Center Expansion Enablement",
                desc: "Supporting greenfield DC projects from feasibility studies and DPR preparation to partner ecosystem introduction."
              },
              {
                title: "Cloud, AI & Digital Infrastructure",
                desc: "Advisory and implementation support for cloud migration, AI infrastructure planning, and digital transformation."
              },
              {
                title: "Technology & Industry Networking",
                desc: "Building meaningful connections across the global digital infrastructure landscape for long-term business growth."
              }
            ].map((capability, idx) => (
              <div key={idx} className="bg-brand-gray p-8 rounded-xl border border-gray-200 hover:border-brand-red transition-colors group">
                <ShieldCheck className="h-10 w-10 text-brand-red mb-5 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-bold text-brand-black mb-3">{capability.title}</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {capability.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY USHNIK TECHNOLOGIES SECTION */}
      <section className="py-20 lg:py-28 bg-brand-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-brand-red font-bold tracking-wide uppercase text-sm mb-2">The Ushnik Advantage</h2>
              <h3 className="text-3xl lg:text-4xl font-heading font-bold mb-6">Why Partner With Us?</h3>
              <p className="text-gray-400 text-lg mb-8">
                We bring a unique dual capability of Infrastructure and Software under one roof, backed by an ecosystem of trusted global partners.
              </p>
              
              <ul className="space-y-4">
                {[
                  "German-engineered, performance-led infrastructure architectures",
                  "Resilience-driven design across hyperscale, private, and hybrid environments",
                  "Neutral advisory — we recommend what's right for your business, not what earns us the most commission",
                  "End-to-end support: feasibility, DPR, design, deployment, operations",
                  "Ecosystem of trusted global DC, cloud, and colocation partners",
                  "Dual capability: Infrastructure + Software under one roof"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-brand-red mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-10">
                <Link href="/about" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-brand-black transition-colors">
                  Learn More About Us
                </Link>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-900 border border-gray-800">
              <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-medium">
                {/* Placeholder for an image or dynamic component */}
                [ Corporate Office / Technology Abstract Image ]
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
