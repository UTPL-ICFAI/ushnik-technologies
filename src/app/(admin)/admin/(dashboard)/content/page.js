import { createClient } from "@/utils/supabase/server";
import HeroForm from "./HeroForm";

export default async function ContentPage() {
  const supabase = await createClient();

  const { data: heroes } = await supabase
    .from('hero_sections')
    .select('*')
    .order('page_route', { ascending: true });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-brand-black">Hero & Page Content</h1>
        <p className="text-gray-500 mt-1">Manage the large headings and subheadings at the top of your pages.</p>
      </div>

      <div className="space-y-6 max-w-4xl">
        {heroes?.map((hero) => (
          <HeroForm key={hero.id} hero={hero} />
        ))}
      </div>
    </div>
  );
}
