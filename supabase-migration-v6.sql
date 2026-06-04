-- Ushnik Technologies Phase 6 Migration (Dynamic About & Industries)
-- Paste this into the Supabase SQL Editor and click RUN

-- ==========================================
-- 1. INDUSTRIES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS industries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT DEFAULT 'Briefcase',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read-only access." ON industries;
CREATE POLICY "Allow public read-only access." ON industries FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow authenticated admin actions." ON industries;
CREATE POLICY "Allow authenticated admin actions." ON industries FOR ALL TO authenticated USING (true);

-- Insert existing static industries
INSERT INTO industries (name, icon_name, description, order_index) VALUES
('Banking, Financial Services & Insurance (BFSI)', 'Briefcase', 'Secure cloud infrastructure, DR solutions, compliance consulting, core banking software support, cybersecurity.', 1),
('Healthcare & Life Sciences', 'HeartPulse', 'HIPAA-aligned infrastructure, hospital management systems, telemedicine platforms, data security.', 2),
('Manufacturing & Industrial', 'Building', 'ERP implementation, OT/IT convergence, plant connectivity, industrial IoT infrastructure, logistics software.', 3),
('Retail & E-Commerce', 'ShoppingCart', 'Scalable cloud infrastructure, e-commerce platform development, CDN optimization, omnichannel solutions.', 4),
('Telecommunications & ISPs', 'ShieldCheck', 'Network infrastructure advisory, carrier interconnection, IXP peering, colocation, DC partnerships.', 5),
('IT & Technology Companies', 'Activity', 'Cloud cost optimization, DevOps setup, SaaS infrastructure, co-location, managed services.', 6),
('Government & Public Sector', 'ShieldCheck', 'Secure data center solutions, NIC connectivity, e-governance platform support, compliance frameworks.', 7),
('Education & EdTech', 'GraduationCap', 'Learning management systems, scalable cloud hosting, video streaming infrastructure, student platforms.', 8),
('Logistics & Supply Chain', 'Building', 'Fleet management software, real-time tracking platforms, warehouse management systems, cloud hosting.', 9),
('Energy & Utilities', 'Zap', 'SCADA system support, infrastructure resilience, backup & DR, industrial network design.', 10),
('Real Estate & Construction', 'Building', 'Property management software, BIM integration, smart building infrastructure, project management tools.', 11),
('Media & Entertainment', 'Activity', 'Video streaming infrastructure, content delivery (CDN), OTT platform development, storage solutions.', 12),
('Startups & New Businesses', 'Briefcase', 'MVP development, affordable cloud setup, infrastructure planning from scratch, product development.', 13),
('Hair, Beauty & Lifestyle', 'HeartPulse', 'Product development platforms, e-commerce websites, brand tech solutions, inventory management.', 14),
('Professional Services', 'Briefcase', 'Document management systems, secure hosting, client portal development, compliance tools.', 15),
('Hospitality & Tourism', 'ShoppingCart', 'Booking platform development, property management software, cloud hosting, guest experience apps.', 16)
ON CONFLICT DO NOTHING;

-- ==========================================
-- 2. ABOUT PAGE CONFIG TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS about_page_config (
    id INTEGER PRIMARY KEY DEFAULT 1,
    who_we_are_text TEXT NOT NULL,
    mission_text TEXT NOT NULL,
    vision_text TEXT NOT NULL,
    leadership_name TEXT,
    leadership_designation TEXT,
    leadership_bio TEXT,
    leadership_image_url TEXT,
    differentiators TEXT[],
    ecosystem_tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE about_page_config ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read-only access." ON about_page_config;
CREATE POLICY "Allow public read-only access." ON about_page_config FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow authenticated admin actions." ON about_page_config;
CREATE POLICY "Allow authenticated admin actions." ON about_page_config FOR ALL TO authenticated USING (true);

-- Insert existing static about content
INSERT INTO about_page_config (
    id, 
    who_we_are_text, 
    mission_text, 
    vision_text,
    leadership_name,
    leadership_designation,
    leadership_bio,
    differentiators,
    ecosystem_tags
) VALUES (
    1,
    'Ushnik Technologies Pvt. Ltd. is a technology and digital infrastructure company headquartered in India, delivering strategic advisory, technology services, and infrastructure solutions to enterprises, startups, and new business setups across India and globally.

We operate through two primary divisions: the **Infrastructure & Data Center Division**, which focuses on cloud advisory, data center partnerships, colocation, IXP ecosystems, and feasibility consulting; and the **Software & Technology Division**, which covers product development, enterprise applications, cybersecurity, and IT staffing.

Our strength lies in our ecosystem — a network of trusted data center operators, cloud providers, colocation facilities, ISPs, and technology partners that allows us to deliver neutral, best-fit recommendations to every client we engage with.',
    'To simplify infrastructure decisions, reduce technology costs, accelerate digital transformation, and enable global-standard connectivity for businesses of every size and industry.',
    'To be India''s most trusted neutral technology and infrastructure advisory partner — connecting businesses with the right infrastructure, the right technology, and the right partnerships.',
    '[Founder Name]',
    '[Designation]',
    '[Brief bio placeholder — 2 to 3 sentences outlining their experience in technology and infrastructure.]',
    ARRAY['Neutral advisory — not tied to any single cloud or DC vendor', 'Dual capability: Infrastructure + Software under one roof', 'Global partnerships with data centers, cloud providers, and technology vendors', 'German-engineered, performance-led infrastructure architectures', 'Deep expertise in IXP, carrier hotel, and interconnection ecosystem development', 'End-to-end support: feasibility, DPR, design, deployment, and optimization'],
    ARRAY['Partner Data Centers (Mumbai, Chennai, Hyderabad, Vizag)', 'Global Cloud Partnership Ecosystem', 'Carrier and ISP Network Collaborations']
)
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- 3. HERO SECTIONS FOR ABOUT & INDUSTRIES
-- ==========================================
INSERT INTO hero_sections (page_route, heading, subheading) VALUES 
('/about', 'About Ushnik Technologies', 'Your strategic partner for navigating the evolving digital economy through robust infrastructure and innovative software solutions.'),
('/industries', 'Industries We Serve', 'Ushnik Technologies serves enterprises, startups, and new business setups across hardware and software requirements — supporting organizations at every stage of their technology journey across all major industry verticals.')
ON CONFLICT (page_route) DO NOTHING;
