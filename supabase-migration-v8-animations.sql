-- Add animation settings columns to global_settings table
ALTER TABLE global_settings 
ADD COLUMN IF NOT EXISTS enable_animations boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS animation_speed text DEFAULT 'normal',
ADD COLUMN IF NOT EXISTS enable_counter_animations boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS enable_scroll_reveal boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS enable_hero_animations boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS enable_chatbot_animations boolean DEFAULT true;
