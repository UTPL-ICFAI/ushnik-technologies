import Link from "next/link";
import { Server, Code, ArrowRight, CheckCircle2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import StaggerContainer, { StaggerItem } from "@/components/animations/StaggerContainer";
import SlideUp from "@/components/animations/SlideUp";
import CountUpStat from "@/components/animations/CountUpStat";
import ScaleOnHover from "@/components/animations/ScaleOnHover";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

// Dynamic Icon Renderer
function DynamicIcon({ name, className }) {
  const IconComponent = LucideIcons[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

export default async function Home() {
  const supabase = await createClient();

  const { data: heroData } = await supabase
    .from('hero_sections')
    .select('*')
    .eq('page_route', '/')
    .single();

  const { data: stats } = await supabase.from('homepage_statistics').select('*').order('order_index', { ascending: true });
  const { data: capabilities } = await supabase.from('capabilities').select('*').order('order_index', { ascending: true });
  const { data: features } = await supabase.from('why_partner_features').select('*').order('order_index', { ascending: true });
  const { data: sectionConfigs } = await supabase.from('homepage_sections_config').select('*');

  const getVisibility = (id) => sectionConfigs?.find(s => s.section_id === id)?.is_visible ?? true;

  const heading = heroData?.heading || "Strategic Technology & Infrastructure Partner for the Evolving Digital Economy";
  const subheading = heroData?.subheading || "Connecting enterprises, cloud ecosystems, and technology partners to unlock scalable growth opportunities across infrastructure, software, and digital services.";

  return (
    <>
      {/* HERO SECTION - TAGLINE & VIDEO */}
      <section className="relative bg-brand-black text-white pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden flex items-center justify-center min-h-[60vh]">
        {heroData?.is_video && heroData?.video_url ? (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
              src={heroData.video_url}
            />
            <div className="absolute inset-0 bg-black/60 z-0"></div>
          </>
        ) : (
          <>
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
              style={{ backgroundImage: `url(${heroData?.fallback_image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop'})` }}
            ></div>
            <div className="absolute inset-0 bg-black/70 z-0"></div>
          </>
        )}
        
        <StaggerContainer className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <StaggerItem>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight mb-6 max-w-5xl mx-auto leading-tight sm:leading-tight md:leading-tight lg:leading-tight text-balance">
              {heading}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto font-body">
              {subheading}
            </p>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {getVisibility('split_services') && (
      <>
        {/* FULL WIDTH SPLIT SCREEN - TWO DIVISIONS */}
        <SlideUp className="flex flex-col lg:flex-row w-full min-h-[50vh]">
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
      </SlideUp>
      </>
      )}

      {getVisibility('trust_bar') && (
      <>
        {/* TRUST BAR */}
        <SlideUp className="bg-brand-gray py-8 border-y border-gray-200" delay={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-x divide-gray-300">
            {stats?.map((stat, idx) => {
              // Extract prefix/suffix for animation
              const numMatch = stat.value.match(/[0-9.]+/);
              const numberPart = numMatch ? numMatch[0] : stat.value;
              const textBefore = stat.value.split(numberPart)[0] || "";
              const textAfter = stat.value.split(numberPart)[1] || "";
              
              return (
                <div key={stat.id} className={`px-4 ${idx > 0 && idx % 2 !== 0 ? 'border-l-0 md:border-l' : idx > 0 ? 'border-l-0 md:border-l' : ''} ${idx === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                  <p className="text-3xl font-bold text-brand-black">
                    {numMatch ? (
                      <CountUpStat value={numberPart} prefix={textBefore} suffix={textAfter} />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </SlideUp>
      </>
      )}

      {getVisibility('capabilities') && (
      <>
        {/* WHAT WE ENABLE SECTION */}
        <section className="py-20 lg:py-28 bg-white">
        <SlideUp className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-brand-red font-bold tracking-wide uppercase text-sm mb-2">Capabilities</h2>
            <h3 className="text-3xl lg:text-4xl font-heading font-bold text-brand-black">What We Enable</h3>
          </div>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {capabilities?.map((capability) => (
              <StaggerItem key={capability.id}>
                <ScaleOnHover className="bg-brand-gray p-8 rounded-xl border border-gray-200 hover:border-brand-red transition-colors group h-full">
                  <DynamicIcon name={capability.icon_name || "ShieldCheck"} className="h-10 w-10 text-brand-red mb-5 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xl font-bold text-brand-black mb-3">{capability.title}</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {capability.description}
                  </p>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </SlideUp>
      </section>
      </>
      )}

      {getVisibility('why_partner') && (
      <>
        {/* WHY USHNIK TECHNOLOGIES SECTION */}
        <section className="py-20 lg:py-28 bg-brand-black text-white relative overflow-hidden">
        <SlideUp className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-brand-red font-bold tracking-wide uppercase text-sm mb-2">The Ushnik Advantage</h2>
              <h3 className="text-3xl lg:text-4xl font-heading font-bold mb-6">Why Partner With Us?</h3>
              <p className="text-gray-400 text-lg mb-8">
                We bring a unique dual capability of Infrastructure and Software under one roof, backed by an ecosystem of trusted global partners.
              </p>
              
              <ul className="space-y-4">
                {features?.map((feat) => (
                  <li key={feat.id} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-brand-red mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feat.text}</span>
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
              {sectionConfigs?.find(s => s.section_id === 'why_partner')?.image_url ? (
                <img 
                  src={sectionConfigs.find(s => s.section_id === 'why_partner').image_url} 
                  alt="Ushnik Advantage" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-medium">
                  {/* Placeholder for an image or dynamic component */}
                  [ Corporate Office / Technology Abstract Image ]
                </div>
              )}
            </div>
          </div>
        </SlideUp>
      </section>
      </>
      )}

    </>
  );
}
