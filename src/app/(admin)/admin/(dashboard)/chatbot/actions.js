"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function requireAuth(supabase) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function updateChatbotSettings(formData) {
  console.log("updateChatbotSettings called! ID:", formData.get("id"));
  const supabase = await createClient();
  await requireAuth(supabase);
  
  const updates = {
    is_enabled: formData.get("is_enabled") === "true",
    welcome_message: formData.get("welcome_message"),
    widget_title: formData.get("widget_title"),
    widget_subtitle: formData.get("widget_subtitle"),
    brand_color: formData.get("brand_color"),
    position: formData.get("position"),
    ai_provider: formData.get("ai_provider"),
    lead_name_enabled: formData.get("lead_name_enabled") === "true",
    lead_email_enabled: formData.get("lead_email_enabled") === "true",
    lead_phone_enabled: formData.get("lead_phone_enabled") === "true",
    lead_capture_message: formData.get("lead_capture_message"),
    offline_message: formData.get("offline_message"),
    fallback_message: formData.get("fallback_message"),
    knowledge_base: formData.get("knowledge_base")
  };

  const id = formData.get("id");

  if (id && id !== "undefined") {
    const { error } = await supabase
      .from("chatbot_settings")
      .update(updates)
      .eq("id", id);
      
    console.log("Update Error (if any):", error);
    if (error) {
      console.error("Error updating chatbot settings:", error);
      return { success: false, error: error.message };
    }
  } else {
    // Upsert or insert if no ID was provided (database was empty)
    const { error } = await supabase
      .from("chatbot_settings")
      .insert([updates]);
      
    if (error) {
      console.error("Error inserting chatbot settings:", error);
      return { success: false, error: error.message };
    }
  }

  revalidatePath("/admin/chatbot");
  revalidatePath("/");
  return { success: true };
}

export async function addQuickAction(formData) {
  const supabase = await createClient();
  await requireAuth(supabase);
  const { error } = await supabase.from("chatbot_quick_actions").insert({
    label: formData.get("label"),
    action_text: formData.get("action_text"),
    order_index: parseInt(formData.get("order_index") || "0")
  });
  
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/chatbot");
  return { success: true };
}

export async function deleteQuickAction(id) {
  const supabase = await createClient();
  await requireAuth(supabase);
  const { error } = await supabase.from("chatbot_quick_actions").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/chatbot");
  return { success: true };
}

export async function addKnowledgeDocument(formData) {
  const supabase = await createClient();
  await requireAuth(supabase);
  const { error } = await supabase.from("chatbot_knowledge_documents").insert({
    title: formData.get("title"),
    content: formData.get("content")
  });
  
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/chatbot");
  return { success: true };
}

export async function deleteKnowledgeDocument(id) {
  const supabase = await createClient();
  await requireAuth(supabase);
  const { error } = await supabase.from("chatbot_knowledge_documents").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/chatbot");
  return { success: true };
}

export async function deleteLead(id) {
  const supabase = await createClient();
  await requireAuth(supabase);
  const { error } = await supabase.from("chatbot_leads").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/chatbot");
  revalidatePath("/admin/chatbot-leads"); // Revalidate both places just in case
  return { success: true };
}
