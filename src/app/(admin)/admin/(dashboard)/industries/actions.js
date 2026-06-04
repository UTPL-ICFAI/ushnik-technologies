"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function requireAuth(supabase) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function updateIndustry(formData) {
  const supabase = await createClient();
  await requireAuth(supabase);

  const id = formData.get("id");
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    icon_name: formData.get("icon_name") || "Briefcase",
    order_index: parseInt(formData.get("order_index")) || 0
  };

  const { error } = await supabase.from("industries").update(data).eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/", "layout");
  return { success: true };
}

export async function addIndustry() {
  const supabase = await createClient();
  await requireAuth(supabase);

  const { error } = await supabase.from("industries").insert({
    name: "New Industry",
    description: "Description of the industry solutions.",
    icon_name: "Briefcase",
    order_index: 99
  });

  if (error) return { success: false, error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteIndustry(id) {
  const supabase = await createClient();
  await requireAuth(supabase);

  const { error } = await supabase.from("industries").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/", "layout");
  return { success: true };
}
