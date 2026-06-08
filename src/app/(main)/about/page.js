import Link from "next/link";
import { Target, Eye, ShieldCheck, Link2 } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import StaggerContainer, { StaggerItem } from "@/components/animations/StaggerContainer";
import SlideUp from "@/components/animations/SlideUp";
import ScaleOnHover from "@/components/animations/ScaleOnHover";

export const metadata = {
  title: "About Us | Ushnik Technologies",
  description: "Learn about Ushnik Technologies, our vision, mission, and how we serve as a strategic technology partner.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function AboutPage() {
  const supabase = await createClient();

  const { data: heroData } = await supabase
    .from('hero_sections')
    .select('*')
    .eq('page_route', '/about')
    .single();

  const { data: config } = await supabase
    .from('about_page_config')
    .select('*')
    .eq('id', 1)
    .single();

  const heading = heroData?.heading || "About Ushnik Technologies";
  const subheading = heroData?.subheading || "Your strategic partner for navigating the evolving digital economy through robust infrastructure and innovative software solutions.";

  // Fallbacks in case config is missing
  const whoWeAre = config?.who_we_are_text || "Ushnik Technologies Pvt. Ltd. is a technology and digital infrastructure company.";
  const mission = config?.mission_text || "To simplify infrastructure decisions.";
  const vision = config?.vision_text || "To be India's most trusted advisory partner.";
  const differentiators = config?.differentiators || [];
  const ecosystemTags = config?.ecosystem_tags || [];

  return (
    <div className="bg-brand-white min-h-screen">
      {/* PAGE HERO */}
      <section className="relative bg-brand-black text-white py-24 lg:py-32 overflow-hidden flex flex-col items-center justify-center text-center px-4 min-h-[75vh] md:min-h-[85vh] lg:min-h-[95vh]">
        {heroData?.is_video && heroData?.video_url ? (
          <>
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" src={heroData.video_url} />
            <div className="absolute inset-0 bg-black/60 z-0"></div>
          </>
        ) : (
          heroData?.fallback_image && (
            <>
              <img src={heroData.fallback_image} alt="" className="absolute inset-0 w-full h-full object-cover z-0 opacity-40" />
              <div className="absolute inset-0 bg-black/50 z-0"></div>
            </>
          )
        )}
        <StaggerContainer className="max-w-4xl mx-auto relative z-10">
          <StaggerItem>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6 whitespace-pre-line">{heading}</h1>
          </StaggerItem>
          <StaggerItem>
            <p className="text-lg lg:text-xl text-gray-400 leading-relaxed whitespace-pre-line">
              {subheading}
            </p>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* COMPANY OVERVIEW */}
      <SlideUp className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold text-brand-black mb-6">Who We Are</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed whitespace-pre-line">
              {whoWeAre.split('\n\n').map((paragraph, idx) => {
                // simple bold parsing
                const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={idx}>
                    {parts.map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i}>{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    })}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ScaleOnHover className="bg-brand-gray p-6 rounded-xl border border-gray-200">
              <Target className="h-10 w-10 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-2">Our Mission</h3>
              <p className="text-sm text-gray-600">
                {mission}
              </p>
            </ScaleOnHover>
            <ScaleOnHover className="bg-brand-gray p-6 rounded-xl border border-gray-200 sm:mt-8">
              <Eye className="h-10 w-10 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-2">Our Vision</h3>
              <p className="text-sm text-gray-600">
                {vision}
              </p>
            </ScaleOnHover>
          </div>
        </div>
      </SlideUp>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="bg-brand-black text-white py-16 lg:py-24">
        <SlideUp className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">What Makes Us Different</h2>
            <p className="text-gray-400">Our unique approach to delivering technology and infrastructure solutions.</p>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((point, index) => (
              <StaggerItem key={index}>
                <ScaleOnHover className="flex items-start bg-gray-900 p-6 rounded-lg border border-gray-800 h-full">
                  <ShieldCheck className="h-6 w-6 text-brand-red mr-4 flex-shrink-0" />
                  <span className="text-gray-300 font-medium">{point}</span>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </SlideUp>
      </section>

      {/* LEADERSHIP (Placeholder) */}
      <SlideUp className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-heading font-bold text-brand-black mb-12 text-center">Leadership</h2>
        <div className="max-w-4xl mx-auto bg-brand-gray p-8 sm:p-10 rounded-xl border border-gray-200 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          
          <div className="flex-shrink-0">
            {config?.leadership_image_url ? (
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-brand-red shadow-lg">
                <img src={config.leadership_image_url} alt={config.leadership_name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
            ) : (
              <div className="w-40 h-40 md:w-48 md:h-48 bg-gray-300 rounded-full overflow-hidden border-4 border-brand-red shadow-lg flex items-center justify-center text-gray-500 font-bold text-5xl">
                {config?.leadership_name ? config.leadership_name.charAt(0) : "U"}
              </div>
            )}
          </div>

          <div className="text-center md:text-left flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-brand-black">{config?.leadership_name || "[Founder Name]"}</h3>
            <p className="text-brand-red font-semibold text-lg mt-1 mb-4">{config?.leadership_designation || "[Designation]"}</p>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {config?.leadership_bio || "[Brief bio placeholder]"}
            </p>
          </div>

        </div>
      </SlideUp>

      {/* PARTNERSHIPS */}
      <SlideUp className="bg-brand-gray py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link2 className="h-12 w-12 text-brand-black mx-auto mb-6" />
          <h2 className="text-3xl font-heading font-bold text-brand-black mb-8">Our Ecosystem</h2>
          <StaggerContainer className="flex flex-wrap justify-center gap-4">
            {ecosystemTags.map((tag, idx) => (
              <StaggerItem key={idx}>
                <ScaleOnHover className="bg-white px-6 py-3 rounded-full text-sm font-semibold border border-gray-300 shadow-sm text-gray-800">
                  {tag}
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </SlideUp>
    </div>
  );
}
