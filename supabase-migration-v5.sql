-- Ushnik Technologies Phase 5 Migration
-- Paste this into the Supabase SQL Editor and click RUN

-- 1. Add Image URL to "Homepage Sections Config" (for Section Images)
ALTER TABLE homepage_sections_config
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 2. Update RLS policies to be secure
-- Make sure only authenticated users can modify these tables.
-- (If these policies already exist but are insecure, you may need to DROP POLICY "Allow all admin actions." ON ...)
DROP POLICY IF EXISTS "Allow all admin actions." ON homepage_sections_config;
DROP POLICY IF EXISTS "Allow authenticated admin actions." ON homepage_sections_config;
CREATE POLICY "Allow authenticated admin actions." ON homepage_sections_config 
FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow all admin actions." ON why_partner_features;
DROP POLICY IF EXISTS "Allow authenticated admin actions." ON why_partner_features;
CREATE POLICY "Allow authenticated admin actions." ON why_partner_features 
FOR ALL TO authenticated USING (true);  

DROP POLICY IF EXISTS "Allow all admin actions." ON homepage_statistics;
DROP POLICY IF EXISTS "Allow authenticated admin actions." ON homepage_statistics;
CREATE POLICY "Allow authenticated admin actions." ON homepage_statistics 
FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow all admin actions." ON capabilities;
DROP POLICY IF EXISTS "Allow authenticated admin actions." ON capabilities;
CREATE POLICY "Allow authenticated admin actions." ON capabilities 
FOR ALL TO authenticated USING (true);

-- 3. Update Global Settings Table (for Footer, Contact Us)
ALTER TABLE global_settings
ADD COLUMN IF NOT EXISTS office_address TEXT DEFAULT '8-2-269/3, Plot No: 3, 2nd Floor, Maharshi House, Banjara Hills Road No.2, Hyderabad, Telangana 500034',
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS twitter_url TEXT;

-- Secure Global Settings
DROP POLICY IF EXISTS "Allow all admin actions." ON global_settings;
DROP POLICY IF EXISTS "Allow authenticated admin actions." ON global_settings;
CREATE POLICY "Allow authenticated admin actions." ON global_settings FOR ALL TO authenticated USING (true);
