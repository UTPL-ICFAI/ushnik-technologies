import { createClient } from "@/utils/supabase/server";
import SettingsForm from "./SettingsForm";
import SocialMediaManager from "./SocialMediaManager";
import { getSocialMediaLinks } from "./socialActions";

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from('global_settings')
    .select('*')
    .single();

  const socialLinks = await getSocialMediaLinks();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-brand-black">Global Settings</h1>
        <p className="text-gray-500 mt-1">Manage global details that appear in the navbar, footer, and across the site.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <SettingsForm initialData={settings} />
      </div>

      <div className="mt-8 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <SocialMediaManager initialLinks={socialLinks} />
      </div>
    </div>
  );
}
