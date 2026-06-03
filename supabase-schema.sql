-- Supabase Schema for Ushnik Technologies

-- 1. GLOBAL SETTINGS TABLE
CREATE TABLE IF NOT EXISTS global_settings (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    tagline TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    registered_office TEXT,
    linkedin_url VARCHAR(255),
    business_hours VARCHAR(255),
    footer_text TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. SERVICES TABLE (For both Infrastructure and Software)
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    division VARCHAR(50) NOT NULL CHECK (division IN ('infrastructure', 'software')),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(100), -- lucide-react icon name
    order_index INTEGER DEFAULT 0,
    tags TEXT[], -- array of string tags
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. HERO SECTIONS TABLE
CREATE TABLE IF NOT EXISTS hero_sections (
    id SERIAL PRIMARY KEY,
    page_route VARCHAR(100) NOT NULL UNIQUE,
    heading TEXT NOT NULL,
    subheading TEXT,
    cta_text VARCHAR(100),
    cta_link VARCHAR(255),
    background_image_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. FORM SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS form_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_type VARCHAR(50) NOT NULL CHECK (form_type IN ('contact', 'assessment')),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    payload JSONB NOT NULL, -- Flexible JSON for assessment form answers
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
ALTER TABLE global_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public read access to content tables
CREATE POLICY "Allow public read access on global_settings" ON global_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access on services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access on hero_sections" ON hero_sections FOR SELECT USING (true);

-- Allow public insert access to form submissions
CREATE POLICY "Allow public insert to form_submissions" ON form_submissions FOR INSERT WITH CHECK (true);

-- Allow authenticated admins to manage content
CREATE POLICY "Allow authenticated full access on global_settings" ON global_settings USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on services" ON services USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on hero_sections" ON hero_sections USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on form_submissions" ON form_submissions USING (auth.role() = 'authenticated');

-- 6. SEED DATA (Initial Content)
INSERT INTO global_settings (company_name, tagline, contact_email, contact_phone, registered_office, linkedin_url, business_hours, footer_text)
VALUES (
    'Ushnik Technologies Pvt. Ltd.',
    'Strategic Technology & Infrastructure Partner',
    'contact@ushniktechnologies.com',
    '+91 77029 01217',
    '[EDIT — Add full registered office address]',
    '#',
    'Monday to Friday, 9:00 AM – 6:30 PM IST',
    '© 2025 Ushnik Technologies Pvt. Ltd. All Rights Reserved.'
) ON CONFLICT DO NOTHING;
