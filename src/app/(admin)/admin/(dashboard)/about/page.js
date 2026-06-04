import { createClient } from "@/utils/supabase/server";
import AboutForm from "./AboutForm";
import HeroForm from "../content/HeroForm";

export default async function AboutCMSPage() {
  const supabase = await createClient();

  const { data: config } = await supabase
    .from('about_page_config')
    .select('*')
    .eq('id', 1)
    .single();

  const { data: heroData } = await supabase
    .from('hero_sections')
    .select('*')
    .eq('page_route', '/about')
    .single();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-brand-black">About Us Content</h1>
        <p className="text-gray-500 mt-1">Manage all the text, lists, and information on the About Us page.</p>
      </div>

      <div className="max-w-4xl space-y-8">
        <HeroForm hero={heroData || { page_route: '/about', heading: 'About Us' }} />
        <AboutForm config={config || {}} />
      </div>
    </div>
  );
}
