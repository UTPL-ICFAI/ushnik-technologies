"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateGlobalSettings(formData) {
  const supabase = await createClient();

  const data = {
    company_name: formData.get("company_name"),
    tagline: formData.get("tagline"),
    contact_email: formData.get("contact_email"),
    contact_phone: formData.get("contact_phone"),
    footer_text: formData.get("footer_text"),
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
