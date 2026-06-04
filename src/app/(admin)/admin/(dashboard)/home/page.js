import { createClient } from "@/utils/supabase/server";
import { PlusCircle, Eye, EyeOff } from "lucide-react";
import StatsForm from "./StatsForm";
import CapabilityForm from "./CapabilityForm";
import FeatureForm from "./FeatureForm";
import SectionImageForm from "./SectionImageForm";
import { addStat, addCapability, addFeature, updateSectionVisibility } from "./actions";

export default async function HomeCMSPage() {
  const supabase = await createClient();

  const { data: stats } = await supabase.from('homepage_statistics').select('*').order('order_index', { ascending: true });
  const { data: capabilities } = await supabase.from('capabilities').select('*').order('order_index', { ascending: true });
  const { data: features } = await supabase.from('why_partner_features').select('*').order('order_index', { ascending: true });
  const { data: sectionConfigs } = await supabase.from('homepage_sections_config').select('*').order('order_index', { ascending: true });

  const getVisibility = (id) => sectionConfigs?.find(s => s.section_id === id)?.is_visible ?? true;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-brand-black">Homepage Content</h1>
        <p className="text-gray-500 mt-1">Manage dynamic sections of the homepage.</p>
      </div>

      <div className="space-y-12">
        {/* Section Visibility Config */}
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-brand-black mb-4 border-b pb-2">Section Visibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectionConfigs?.map(config => (
              <form key={config.section_id} action={async () => {
                "use server";
                await updateSectionVisibility(config.section_id, !config.is_visible);
              }} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-100">
                <span className="font-medium text-sm">{config.title}</span>
                <button type="submit" className={`flex items-center text-xs px-2 py-1 rounded ${config.is_visible ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                  {config.is_visible ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                  {config.is_visible ? 'Visible' : 'Hidden'}
                </button>
              </form>
            ))}
          </div>
        </section>

        {/* Statistics Section */}
        <section className={`p-6 rounded-lg ${!getVisibility('trust_bar') ? 'opacity-50 bg-gray-50' : 'bg-white shadow-sm border'}`}>
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-xl font-bold text-brand-black">Statistics (Trust Bar)</h2>
            <form action={addStat}>
              <button type="submit" className="flex items-center text-sm bg-brand-black text-white px-3 py-1.5 rounded hover:bg-gray-800 transition-colors">
                <PlusCircle className="h-4 w-4 mr-1" /> Add Statistic
              </button>
            </form>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {stats?.map((stat) => (
              <StatsForm key={stat.id} stat={stat} />
            ))}
          </div>
        </section>

        {/* Capabilities Section */}
        <section className={`p-6 rounded-lg ${!getVisibility('capabilities') ? 'opacity-50 bg-gray-50' : 'bg-white shadow-sm border'}`}>
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-xl font-bold text-brand-black">Capabilities (What We Enable)</h2>
            <form action={addCapability}>
              <button type="submit" className="flex items-center text-sm bg-brand-black text-white px-3 py-1.5 rounded hover:bg-gray-800 transition-colors">
                <PlusCircle className="h-4 w-4 mr-1" /> Add Capability
              </button>
            </form>
          </div>
          <div className="space-y-6">
            {capabilities?.map((cap) => (
              <CapabilityForm key={cap.id} capability={cap} />
            ))}
          </div>
        </section>

        {/* Why Partner Section */}
        <section className={`p-6 rounded-lg ${!getVisibility('why_partner') ? 'opacity-50 bg-gray-50' : 'bg-white shadow-sm border'}`}>
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-xl font-bold text-brand-black">Why Partner Features</h2>
            <form action={addFeature}>
              <button type="submit" className="flex items-center text-sm bg-brand-black text-white px-3 py-1.5 rounded hover:bg-gray-800 transition-colors">
                <PlusCircle className="h-4 w-4 mr-1" /> Add Feature
              </button>
            </form>
          </div>
          
          <div className="mb-8 max-w-2xl">
            <SectionImageForm 
              sectionId="why_partner" 
              initialImageUrl={sectionConfigs?.find(s => s.section_id === 'why_partner')?.image_url} 
              label="Main Section Image" 
            />
          </div>

          <div className="space-y-4 max-w-2xl">
            {features?.map((feat) => (
              <FeatureForm key={feat.id} feature={feat} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
