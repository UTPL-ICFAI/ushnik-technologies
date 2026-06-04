"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function requireAuth(supabase) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function updateAboutConfig(formData) {
  const supabase = await createClient();
  await requireAuth(supabase);

  // Convert textarea bullet points into arrays
  const differentiators = (formData.get("differentiators") || "")
    .split("\n")
    .map(t => t.trim())
    .filter(t => t.length > 0);

  const ecosystem_tags = (formData.get("ecosystem_tags") || "")
    .split("\n")
    .map(t => t.trim())
    .filter(t => t.length > 0);

  const data = {
    who_we_are_text: formData.get("who_we_are_text"),
    mission_text: formData.get("mission_text"),
    vision_text: formData.get("vision_text"),
    leadership_name: formData.get("leadership_name"),
    leadership_designation: formData.get("leadership_designation"),
    leadership_bio: formData.get("leadership_bio"),
    leadership_image_url: formData.get("leadership_image_url") || null,
    differentiators: differentiators,
    ecosystem_tags: ecosystem_tags,
  };

  const { error } = await supabase
    .from("about_page_config")
    .update(data)
    .eq("id", 1); // Always id 1

  if (error) return { success: false, error: error.message };

  revalidatePath("/", "layout");
  return { success: true };
}
