"use server";

import { createClient } from "@/utils/supabase/server";

export async function submitJobApplication(formData) {
  try {
    const supabase = await createClient();

    const jobId = formData.get("jobId");
    const resumeFile = formData.get("resume");
    const coverLetterFile = formData.get("cover_letter");

    if (!resumeFile || resumeFile.size === 0) {
      return { success: false, error: "Resume is required." };
    }
    if (resumeFile.size > 5 * 1024 * 1024) {
      return { success: false, error: "Resume file size must be less than 5MB." };
    }

    let resumeUrl = "";
    let coverLetterUrl = "";

    // Upload Resume
    const resumeExt = resumeFile.name.split('.').pop();
    const resumeFileName = `${jobId}/${crypto.randomUUID()}.${resumeExt}`;
    const { error: resumeUploadError } = await supabase.storage
      .from("resumes")
      .upload(resumeFileName, resumeFile);

    if (resumeUploadError) {
      console.error("Resume Upload Error:", resumeUploadError);
      return { success: false, error: "Failed to upload resume." };
    }

    const { data: resumeData } = supabase.storage.from("resumes").getPublicUrl(resumeFileName);
    resumeUrl = resumeData.publicUrl;

    // Upload Cover Letter if provided
    if (coverLetterFile && coverLetterFile.size > 0) {
      const clExt = coverLetterFile.name.split('.').pop();
      const clFileName = `${jobId}/${crypto.randomUUID()}-cl.${clExt}`;
      const { error: clUploadError } = await supabase.storage
        .from("resumes")
        .upload(clFileName, coverLetterFile);
      
      if (!clUploadError) {
        const { data: clData } = supabase.storage.from("resumes").getPublicUrl(clFileName);
        coverLetterUrl = clData.publicUrl;
      }
    }

    // Insert Application
    const { error: dbError } = await supabase
      .from("job_applications")
      .insert({
        job_id: jobId,
        full_name: formData.get("full_name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        current_location: formData.get("current_location"),
        experience: formData.get("experience"),
        current_company: formData.get("current_company"),
        current_designation: formData.get("current_designation"),
        notice_period: formData.get("notice_period"),
        expected_salary: formData.get("expected_salary"),
        answers: JSON.parse(formData.get("answers") || '{}'),
        resume_url: resumeUrl,
        cover_letter_url: coverLetterUrl,
        status: "Applied"
      });

    if (dbError) {
      console.error("DB Insert Error:", dbError);
      return { success: false, error: "Failed to submit application details." };
    }

    return { success: true };
  } catch (err) {
    console.error("Application Error:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}
