-- Fix missing RLS policy for chatbot_settings
-- This allows updates from the admin panel to actually save to the database.
CREATE POLICY "Allow all admin actions." ON chatbot_settings FOR ALL USING (true);
