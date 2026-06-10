"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getSocialMediaLinks() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("social_media_links")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Error fetching social media links:", error);
    // Return empty array if table doesn't exist yet (before migration runs)
    return [];
  }
  return data;
}

export async function addSocialMediaLink(formData) {
  const supabase = await createClient();
  
  const newLink = {
    platform_name: formData.get("platform_name"),
    url: formData.get("url"),
    icon_name: formData.get("icon_name"),
    brand_color: formData.get("brand_color") || null,
    order_index: parseInt(formData.get("order_index") || "0"),
    is_active: formData.get("is_active") === "true",
  };

  const { error } = await supabase.from("social_media_links").insert(newLink);

  if (error) return { success: false, error: error.message };
  
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateSocialMediaLink(id, formData) {
  const supabase = await createClient();
  
  const updates = {
    platform_name: formData.get("platform_name"),
    url: formData.get("url"),
    icon_name: formData.get("icon_name"),
    brand_color: formData.get("brand_color") || null,
    is_active: formData.get("is_active") === "true",
  };

  const { error } = await supabase.from("social_media_links").update(updates).eq("id", id);

  if (error) return { success: false, error: error.message };
  
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteSocialMediaLink(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("social_media_links").delete().eq("id", id);
  
  if (error) return { success: false, error: error.message };
  
  revalidatePath("/", "layout");
  return { success: true };
}

export async function toggleSocialMediaActive(id, currentState) {
  const supabase = await createClient();
  const { error } = await supabase.from("social_media_links").update({ is_active: !currentState }).eq("id", id);
  
  if (error) return { success: false, error: error.message };
  
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateSocialMediaOrder(links) {
  const supabase = await createClient();
  
  // Sequential updates for reliable ordering without full upsert payload
  for (let i = 0; i < links.length; i++) {
    await supabase.from("social_media_links").update({ order_index: i }).eq("id", links[i].id);
  }
  
  revalidatePath("/", "layout");
  return { success: true };
}
