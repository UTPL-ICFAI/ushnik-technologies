-- Migration: Create Careers Module Tables

-- 1. Create Jobs Table
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    experience TEXT NOT NULL,
    salary_range TEXT,
    employment_type TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements JSONB DEFAULT '[]'::jsonb,
    responsibilities JSONB DEFAULT '[]'::jsonb,
    benefits JSONB DEFAULT '[]'::jsonb,
    custom_questions JSONB DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'open', -- 'open', 'closed', 'draft'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add updated_at trigger for jobs
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_jobs_updated_at ON public.jobs;
CREATE TRIGGER set_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 2. Create Job Applications Table
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    current_location TEXT NOT NULL,
    experience TEXT NOT NULL,
    current_company TEXT,
    current_designation TEXT,
    notice_period TEXT NOT NULL,
    expected_salary TEXT,
    resume_url TEXT NOT NULL,
    cover_letter_url TEXT,
    answers JSONB DEFAULT '{}'::jsonb,
    status TEXT NOT NULL DEFAULT 'Applied', -- 'Applied', 'Screening', 'Interview Scheduled', 'Technical Round', 'HR Round', 'Offered', 'Hired', 'Rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

DROP TRIGGER IF EXISTS set_job_applications_updated_at ON public.job_applications;
CREATE TRIGGER set_job_applications_updated_at
BEFORE UPDATE ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 3. Create Storage Bucket for Resumes (if using Supabase Storage)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- 4. Set up Row Level Security (RLS)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Jobs Policies
CREATE POLICY "Public can view open jobs" ON public.jobs
    FOR SELECT USING (status = 'open');

CREATE POLICY "Authenticated users can do all on jobs" ON public.jobs
    FOR ALL USING (auth.role() = 'authenticated');

-- Applications Policies
CREATE POLICY "Public can insert job applications" ON public.job_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can do all on job applications" ON public.job_applications
    FOR ALL USING (auth.role() = 'authenticated');

-- 5. Update Software Services with AI Capabilities
UPDATE public.services
SET bullet_points = bullet_points || ARRAY['AI-Powered Applications', 'Generative AI Solutions', 'AI Agents & Assistants', 'Enterprise AI Integration', 'Machine Learning Solutions', 'Intelligent Workflow Automation', 'AI-Powered Analytics', 'Predictive Systems', 'Custom AI Platforms']::text[]
WHERE division = 'software' AND title ILIKE '%Product & Software Development%';

UPDATE public.services
SET bullet_points = bullet_points || ARRAY['AI Threat Detection', 'AI Security Monitoring', 'Intelligent Security Operations', 'Predictive Threat Analysis', 'Automated Incident Response', 'AI-Driven Vulnerability Assessment', 'Behavioral Analytics', 'Security Automation']::text[]
WHERE division = 'software' AND title ILIKE '%Cybersecurity%';
