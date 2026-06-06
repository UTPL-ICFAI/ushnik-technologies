"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function requireAuth(supabase) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function updateGlobalSettings(formData) {
  const supabase = await createClient();
  await requireAuth(supabase);

    const data = {
      company_name: formData.get("company_name"),
      tagline: formData.get("tagline"),
      contact_email: formData.get("contact_email"),
      contact_phone: formData.get("contact_phone"),
      office_address: formData.get("office_address"),
      linkedin_url: formData.get("linkedin_url"),
      twitter_url: formData.get("twitter_url"),
      footer_text: formData.get("footer_text"),
      enable_animations: formData.get("enable_animations") === "true",
      animation_speed: formData.get("animation_speed") || "normal",
      enable_counter_animations: formData.get("enable_counter_animations") === "true",
      enable_scroll_reveal: formData.get("enable_scroll_reveal") === "true",
      enable_hero_animations: formData.get("enable_hero_animations") === "true",
      enable_chatbot_animations: formData.get("enable_chatbot_animations") === "true",
    };

  const { error } = await supabase
    .from("global_settings")
    .update(data)
    .eq("id", 1); // Assuming id 1 is the main settings row

  if (error) {
    return { success: false, error: error.message };
  }

  // Revalidate the entire layout so the changes appear immediately everywhere
  revalidatePath("/", "layout");
  
  return { success: true };
}
