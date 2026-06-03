"use server";

import { createClient } from "@/utils/supabase/server";

export async function submitContactForm(formData) {
  const supabase = await createClient();

  const data = {
    form_type: "contact",
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    company: formData.get("company"),
    payload: {
      subject: formData.get("subject"),
      message: formData.get("message")
    }
  };

  const { error } = await supabase
    .from("form_submissions")
    .insert([data]);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
