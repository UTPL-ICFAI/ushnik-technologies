-- Migration: Create Social Media Links Table

CREATE TABLE IF NOT EXISTS public.social_media_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform_name TEXT NOT NULL,
    url TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    brand_color TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- CLEANUP: Remove duplicates created by running the script multiple times
TRUNCATE TABLE public.social_media_links;

-- Prevent future duplicates
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'unique_platform_name'
    ) THEN
        ALTER TABLE public.social_media_links ADD CONSTRAINT unique_platform_name UNIQUE (platform_name);
    END IF;
END $$;

-- Add RLS Policies
ALTER TABLE public.social_media_links ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Enable read access for all users" ON public.social_media_links;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.social_media_links;
DROP POLICY IF EXISTS "Enable update for all users" ON public.social_media_links;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.social_media_links;

-- Create full CRUD policies since the app uses the Anon key for admin actions
CREATE POLICY "Enable read access for all users" ON public.social_media_links FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.social_media_links FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.social_media_links FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete for all users" ON public.social_media_links FOR DELETE USING (true);

-- Pre-populate platforms (duplicates prevented by UNIQUE constraint)
INSERT INTO public.social_media_links (platform_name, url, icon_name, brand_color, order_index, is_active)
VALUES 
    ('LinkedIn', 'https://linkedin.com/company/ushnik-technologies', 'FaLinkedinIn', '#0a66c2', 1, true),
    ('Instagram', 'https://instagram.com/ushniktech', 'FaInstagram', '#E1306C', 2, true),
    ('YouTube', 'https://youtube.com/@ushniktech', 'FaYoutube', '#FF0000', 3, true),
    ('Facebook', 'https://facebook.com/ushniktech', 'FaFacebookF', '#1877F2', 4, true),
    ('X', 'https://twitter.com/ushniktech', 'FaXTwitter', '#000000', 5, true),
    ('WhatsApp', 'https://wa.me/917702901217', 'FaWhatsapp', '#25D366', 6, false),
    ('Telegram', 'https://t.me/ushniktech', 'FaTelegramPlane', '#229ED9', 7, false)
ON CONFLICT (platform_name) DO NOTHING;
