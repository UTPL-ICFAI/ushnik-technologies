"use server";

import { createClient } from "@/utils/supabase/server";

export async function submitAssessmentForm(formData) {
  const supabase = await createClient();

  const data = {
    form_type: "assessment",
    full_name: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("companyName"),
    payload: {
      requirement_type: formData.get("requirementType"),
      designation: formData.get("designation"),
      location: formData.get("location"),
      // Add any array inputs to payload
      providers: formData.getAll("providers"),
      deployment_models: formData.getAll("deployment_models"),
      pain_points: formData.getAll("pain_points"),
      monthly_spend: formData.get("monthly_spend"),
      workloads: formData.getAll("workloads"),
      expected_users: formData.get("expected_users"),
      support_needed: formData.getAll("support_needed"),
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
