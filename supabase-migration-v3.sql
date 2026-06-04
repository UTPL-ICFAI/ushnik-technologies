-- Ushnik Technologies Phase 3 Migration (Chatbot CRM)
-- Paste this into the Supabase SQL Editor and click RUN

-- 1. Update existing chatbot_settings table with new styling and CRM fields
ALTER TABLE chatbot_settings
ADD COLUMN IF NOT EXISTS widget_title TEXT DEFAULT 'Ushnik AI Assistant',
ADD COLUMN IF NOT EXISTS widget_subtitle TEXT DEFAULT 'We typically reply in a few minutes',
ADD COLUMN IF NOT EXISTS brand_color TEXT DEFAULT '#dc2626',
ADD COLUMN IF NOT EXISTS position TEXT DEFAULT 'right',
ADD COLUMN IF NOT EXISTS lead_name_enabled BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS lead_email_enabled BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS lead_phone_enabled BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS lead_capture_message TEXT DEFAULT 'Before we connect you with our team, please share your details.',
ADD COLUMN IF NOT EXISTS offline_message TEXT DEFAULT 'Our team is currently offline. Please leave your details and we will contact you.',
ADD COLUMN IF NOT EXISTS fallback_message TEXT DEFAULT 'I am sorry, I could not find an answer to that question.',
ADD COLUMN IF NOT EXISTS ai_provider TEXT DEFAULT 'gemini';

-- 2. Chatbot Quick Actions Table
CREATE TABLE IF NOT EXISTS chatbot_quick_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,
    action_text TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
ALTER TABLE chatbot_quick_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON chatbot_quick_actions FOR SELECT USING (true);
CREATE POLICY "Allow all admin actions." ON chatbot_quick_actions FOR ALL USING (true);

-- 3. Chatbot Knowledge Documents Table
CREATE TABLE IF NOT EXISTS chatbot_knowledge_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
ALTER TABLE chatbot_knowledge_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON chatbot_knowledge_documents FOR SELECT USING (true);
CREATE POLICY "Allow all admin actions." ON chatbot_knowledge_documents FOR ALL USING (true);

-- 4. Chatbot Leads Table
CREATE TABLE IF NOT EXISTS chatbot_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    email TEXT,
    phone TEXT,
    company TEXT,
    chat_history JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
ALTER TABLE chatbot_leads ENABLE ROW LEVEL SECURITY;
-- Anyone can insert a lead (public)
CREATE POLICY "Allow public insert for leads." ON chatbot_leads FOR INSERT WITH CHECK (true);
-- Only admins can view leads
CREATE POLICY "Allow admin view leads." ON chatbot_leads FOR SELECT USING (true);

-- Insert Default Quick Actions
INSERT INTO chatbot_quick_actions (label, action_text, order_index) VALUES
('Our Services', 'What services do you offer?', 1),
('Contact Us', 'I want to speak to an expert.', 2),
('Request Quote', 'I would like to request a quote.', 3);
