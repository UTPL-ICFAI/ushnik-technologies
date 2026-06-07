"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveJob(formData) {
  try {
    const supabase = await createClient();
    const jobId = formData.get("id");
    const isNew = formData.get("isNew") === "true";

    const requirements = formData.get("requirements").split("\n").filter(Boolean);
    const responsibilities = formData.get("responsibilities").split("\n").filter(Boolean);
    const benefits = formData.get("benefits").split("\n").filter(Boolean);
    const customQuestions = formData.get("custom_questions").split("\n").filter(Boolean);

    const payload = {
      title: formData.get("title"),
      department: formData.get("department"),
      location: formData.get("location"),
      experience: formData.get("experience"),
      salary_range: formData.get("salary_range"),
      employment_type: formData.get("employment_type"),
      description: formData.get("description"),
      status: formData.get("status"),
      requirements: JSON.stringify(requirements),
      responsibilities: JSON.stringify(responsibilities),
      benefits: JSON.stringify(benefits),
      custom_questions: JSON.stringify(customQuestions),
    };

    let result;
    if (isNew) {
      result = await supabase.from("jobs").insert(payload).select().single();
    } else {
      result = await supabase.from("jobs").update(payload).eq("id", jobId).select().single();
    }

    if (result.error) {
      console.error("Save Job Error:", result.error);
      return { success: false, error: "Failed to save job." };
    }

    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    return { success: true, jobId: result.data.id };
  } catch (err) {
    console.error("Save Job Unknown Error:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function updateApplicationStatus(applicationId, status) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("job_applications")
      .update({ status })
      .eq("id", applicationId);

    if (error) {
      console.error("Update Status Error:", error);
      return { success: false, error: "Failed to update status." };
    }
    
    revalidatePath("/admin/careers/[id]", "page");
    return { success: true };
  } catch (err) {
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function deleteApplication(applicationId) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("job_applications")
      .delete()
      .eq("id", applicationId)
      .eq("status", "Rejected"); // Extra safety check

    if (error) {
      console.error("Delete Application Error:", error);
      return { success: false, error: "Failed to delete application." };
    }
    
    revalidatePath("/admin/careers/[id]", "page");
    return { success: true };
  } catch (err) {
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function deleteJob(jobId) {
  try {
    const supabase = await createClient();
    
    // First delete associated applications to avoid foreign key constraints (if no cascade)
    await supabase.from("job_applications").delete().eq("job_id", jobId);
    
    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", jobId);

    if (error) {
      console.error("Delete Job Error:", error);
      return { success: false, error: "Failed to delete job." };
    }
    
    revalidatePath("/admin/careers");
    return { success: true };
  } catch (err) {
    return { success: false, error: "An unexpected error occurred." };
  }
}
