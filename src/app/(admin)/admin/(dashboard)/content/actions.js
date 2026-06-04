"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function requireAuth(supabase) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function updateHeroSection(formData) {
  const supabase = await createClient();
  await requireAuth(supabase);

  const id = formData.get("id");
  const data = {
    heading: formData.get("heading"),
    subheading: formData.get("subheading"),
    is_video: formData.get("is_video_value") === "true",
    video_url: formData.get("video_url") || null,
  };

  const { error } = await supabase
    .from("hero_sections")
    .update(data)
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  // Revalidate the entire layout so the changes appear immediately
  revalidatePath("/", "layout");
  
  return { success: true };
}
