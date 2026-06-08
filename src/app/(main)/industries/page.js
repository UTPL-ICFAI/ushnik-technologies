import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import * as LucideIcons from "lucide-react";
import StaggerContainer, { StaggerItem } from "@/components/animations/StaggerContainer";
import SlideUp from "@/components/animations/SlideUp";
import ScaleOnHover from "@/components/animations/ScaleOnHover";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

// Dynamic Icon Renderer
function DynamicIcon({ name, className }) {
  const IconComponent = LucideIcons[name] || LucideIcons.Briefcase;
  return <IconComponent className={className} />;
}

export default async function IndustriesPage() {
  const supabase = await createClient();

  const { data: heroData } = await supabase
    .from('hero_sections')
    .select('*')
    .eq('page_route', '/industries')
    .single();

  const { data: industries } = await supabase
    .from('industries')
    .select('*')
    .order('order_index', { ascending: true });

  const heading = heroData?.heading || "Industries We Serve";
  const subheading = heroData?.subheading || "Ushnik Technologies serves enterprises, startups, and new business setups across hardware and software requirements — supporting organizations at every stage of their technology journey across all major industry verticals.";

  return (
    <div className="bg-brand-gray min-h-screen pb-20">
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

      {/* GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {industries?.map((ind) => (
            <StaggerItem key={ind.id}>
              <ScaleOnHover className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-brand-red hover:shadow-md transition-all group h-full block">
                <DynamicIcon name={ind.icon_name} className="h-8 w-8 text-brand-red mb-4" />
                <h3 className="text-lg font-bold text-brand-black mb-3">{ind.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
                  {ind.description}
                </p>
              </ScaleOnHover>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CTA */}
      <SlideUp className="mt-20 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-brand-black mb-4">Don't see your industry?</h2>
        <p className="text-gray-600 mb-8">We provide custom solutions tailored to unique business models and niches. Contact us to discuss your specific requirements.</p>
        <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-red hover:bg-red-700 transition-colors">
          Discuss Your Project
        </Link>
      </SlideUp>
    </div>
  );
}
