"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function requireAuth(supabase) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function updateStat(formData) {
  try {
    const supabase = await createClient();
    await requireAuth(supabase);
    const id = formData.get("id");
    const { error } = await supabase.from("homepage_statistics").update({
      value: formData.get("value"),
      label: formData.get("label"),
      order_index: parseInt(formData.get("order_index")) || 0
    }).eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("updateStat error:", error);
    return { success: false, error: error.message || "Server Error" };
  }
}

export async function updateCapability(formData) {
  const supabase = await createClient();
  await requireAuth(supabase);
  const id = formData.get("id");
  const { error } = await supabase.from("capabilities").update({
    title: formData.get("title"),
    description: formData.get("description"),
    icon_name: formData.get("icon_name"),
    order_index: parseInt(formData.get("order_index")) || 0
  }).eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateFeature(formData) {
  const supabase = await createClient();
  await requireAuth(supabase);
  const id = formData.get("id");
  const { error } = await supabase.from("why_partner_features").update({
    text: formData.get("text"),
    order_index: parseInt(formData.get("order_index")) || 0
  }).eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

// ========================
// ADD FUNCTIONS
// ========================

export async function addStat() {
  const supabase = await createClient();
  await requireAuth(supabase);
  await supabase.from("homepage_statistics").insert({ value: "New Stat", label: "New Label", order_index: 99 });
  revalidatePath("/", "layout");
  return { success: true };
}

export async function addCapability() {
  const supabase = await createClient();
  await requireAuth(supabase);
  await supabase.from("capabilities").insert({ title: "New Capability", description: "Description here", icon_name: "ShieldCheck", order_index: 99 });
  revalidatePath("/", "layout");
  return { success: true };
}

export async function addFeature() {
  const supabase = await createClient();
  await requireAuth(supabase);
  await supabase.from("why_partner_features").insert({ text: "New feature benefit", order_index: 99 });
  revalidatePath("/", "layout");
  return { success: true };
}

// ========================
// DELETE FUNCTIONS
// ========================

export async function deleteStat(id) {
  const supabase = await createClient();
  await requireAuth(supabase);
  await supabase.from("homepage_statistics").delete().eq("id", id);
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteCapability(id) {
  const supabase = await createClient();
  await requireAuth(supabase);
  await supabase.from("capabilities").delete().eq("id", id);
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteFeature(id) {
  const supabase = await createClient();
  await requireAuth(supabase);
  await supabase.from("why_partner_features").delete().eq("id", id);
  revalidatePath("/", "layout");
  return { success: true };
}

// ========================
// SECTION VISIBILITY
// ========================

export async function updateSectionVisibility(section_id, is_visible) {
  const supabase = await createClient();
  await requireAuth(supabase);
  await supabase.from("homepage_sections_config").update({ is_visible }).eq("section_id", section_id);
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateSectionImage(section_id, image_url) {
  try {
    const supabase = await createClient();
    await requireAuth(supabase);
    const { error } = await supabase.from("homepage_sections_config").update({ image_url }).eq("section_id", section_id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("updateSectionImage error:", error);
    return { success: false, error: error.message || "Server Error" };
  }
}
