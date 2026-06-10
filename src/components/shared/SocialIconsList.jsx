import { createClient } from "@/utils/supabase/server";
import SocialIcon from "./SocialIcon";

export default async function SocialIconsList({ className = "", iconClassName = "" }) {
  const supabase = await createClient();
  const { data: links, error } = await supabase
    .from("social_media_links")
    .select("*")
    .eq("is_active", true)
    .order("order_index", { ascending: true });

  if (error || !links || links.length === 0) {
    // Graceful fallback if table is empty or doesn't exist yet
    return null;
  }

  return (
    <div className={`flex items-center space-x-6 ${className}`}>
      {links.map((link) => (
        <SocialIcon key={link.id} link={link} className={iconClassName} />
      ))}
    </div>
  );
}
