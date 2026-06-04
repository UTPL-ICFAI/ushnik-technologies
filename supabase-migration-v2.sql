-- Ushnik Technologies Phase 2 Migration
-- Paste this into the Supabase SQL Editor and click RUN

-- 1. Update existing hero_sections table
ALTER TABLE hero_sections
ADD COLUMN IF NOT EXISTS is_video BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS fallback_image TEXT;

-- 2. Homepage Statistics Table
CREATE TABLE IF NOT EXISTS homepage_statistics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    value TEXT NOT NULL,
    label TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
ALTER TABLE homepage_statistics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON homepage_statistics FOR SELECT USING (true);

-- 3. Capabilities Table
CREATE TABLE IF NOT EXISTS capabilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT DEFAULT 'CheckCircle2',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
ALTER TABLE capabilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON capabilities FOR SELECT USING (true);

-- 4. Why Partner Features Table
CREATE TABLE IF NOT EXISTS why_partner_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    text TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
ALTER TABLE why_partner_features ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON why_partner_features FOR SELECT USING (true);

-- 5. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    company TEXT,
    review_text TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON testimonials FOR SELECT USING (true);

-- 6. FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON faqs FOR SELECT USING (true);

-- 7. Chatbot Settings Table
CREATE TABLE IF NOT EXISTS chatbot_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_enabled BOOLEAN DEFAULT TRUE,
    welcome_message TEXT NOT NULL DEFAULT 'Hello! How can I help you with Ushnik Technologies today?',
    knowledge_base TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
ALTER TABLE chatbot_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON chatbot_settings FOR SELECT USING (true);

-- Insert default chatbot settings
INSERT INTO chatbot_settings (is_enabled, welcome_message, knowledge_base)
VALUES (
    TRUE,
    'Hello! How can I help you with Ushnik Technologies today?',
    'You are an AI assistant for Ushnik Technologies Pvt. Ltd. You help users understand our Infrastructure and Software services. Ushnik provides Cloud, Colocation, Data Center partnerships, Product Development, and IT Solutions.'
);

-- 8. Create Storage Bucket for Videos
-- Note: Requires Supabase Storage to be enabled.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- Set up Storage Policies for 'videos' bucket
CREATE POLICY "Give public access to videos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'videos');

CREATE POLICY "Allow authenticated uploads to videos" 
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Allow authenticated deletes for videos" 
ON storage.objects FOR DELETE 
TO authenticated
USING (bucket_id = 'videos');

-- 9. Insert Initial Seed Data (Matches Existing Static Frontend)
INSERT INTO homepage_statistics (value, label, order_index) VALUES
('10+ Years', 'Industry Experience', 1),
('50+ Clients', 'Enterprises Served', 2),
('20+ Partners', 'DC & Cloud Partners', 3),
('Pan-India', 'Service Coverage', 4),
('Global Reach', 'Collaborations', 5);

INSERT INTO capabilities (title, description, icon_name, order_index) VALUES
('Global Business Collaborations', 'Facilitating strategic partnerships between enterprises, technology providers, and data center operators worldwide.', 'ShieldCheck', 1),
('Enterprise & Client Connects', 'Bridging the gap between infrastructure needs and the right technology partners for seamless delivery.', 'ShieldCheck', 2),
('Strategic Partnership Opportunities', 'Creating joint venture, colocation, and distribution partnerships across the cloud and data center ecosystem.', 'ShieldCheck', 3),
('Data Center Expansion Enablement', 'Supporting greenfield DC projects from feasibility studies and DPR preparation to partner ecosystem introduction.', 'ShieldCheck', 4),
('Cloud, AI & Digital Infrastructure', 'Advisory and implementation support for cloud migration, AI infrastructure planning, and digital transformation.', 'ShieldCheck', 5),
('Technology & Industry Networking', 'Building meaningful connections across the global digital infrastructure landscape for long-term business growth.', 'ShieldCheck', 6);

INSERT INTO why_partner_features (text, order_index) VALUES
('German-engineered, performance-led infrastructure architectures', 1),
('Resilience-driven design across hyperscale, private, and hybrid environments', 2),
('Neutral advisory — we recommend what''s right for your business, not what earns us the most commission', 3),
('End-to-end support: feasibility, DPR, design, deployment, operations', 4),
('Ecosystem of trusted global DC, cloud, and colocation partners', 5),
('Dual capability: Infrastructure + Software under one roof', 6);
