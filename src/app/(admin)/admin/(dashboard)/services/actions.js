"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateService(formData) {
  const supabase = await createClient();

  const id = formData.get("id");
  
  // Convert newline separated string back to array
  const rawBullets = formData.get("bullet_points") || "";
  const bullet_points = rawBullets
    .split("\n")
    .map(b => b.trim())
    .filter(b => b.length > 0);

  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    icon_name: formData.get("icon_name"),
    footer_text: formData.get("footer_text") || null,
    bullet_points: bullet_points,
  };

  const { error } = await supabase
    .from("services")
    .update(data)
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteService(id) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function insertService(formData) {
  const supabase = await createClient();

  const rawBullets = formData.get("bullet_points") || "";
  const bullet_points = rawBullets
    .split("\n")
    .map(b => b.trim())
    .filter(b => b.length > 0);

  const data = {
    division: formData.get("division"),
    title: formData.get("title"),
    description: formData.get("description"),
    icon_name: formData.get("icon_name"),
    footer_text: formData.get("footer_text") || null,
    bullet_points: bullet_points,
    order_index: 99, // default to end
  };

  const { error } = await supabase
    .from("services")
    .insert([data]);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}
