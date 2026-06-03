"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateHeroSection(formData) {
  const supabase = await createClient();

  const id = formData.get("id");
  const data = {
    heading: formData.get("heading"),
    subheading: formData.get("subheading"),
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
