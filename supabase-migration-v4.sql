-- Ushnik Technologies Phase 4 Migration (CMS Core)
-- Paste this into the Supabase SQL Editor and click RUN

CREATE TABLE IF NOT EXISTS homepage_sections_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    is_visible BOOLEAN DEFAULT TRUE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
ALTER TABLE homepage_sections_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON homepage_sections_config FOR SELECT USING (true);
CREATE POLICY "Allow all admin actions." ON homepage_sections_config FOR ALL USING (true);

INSERT INTO homepage_sections_config (section_id, title, is_visible, order_index) VALUES
('hero', 'Hero & Video Header', TRUE, 1),
('split_services', 'Infrastructure vs Software', TRUE, 2),
('trust_bar', 'Trust Statistics', TRUE, 3),
('capabilities', 'What We Enable', TRUE, 4),
('why_partner', 'Why Partner With Us', TRUE, 5)
ON CONFLICT (section_id) DO NOTHING;
