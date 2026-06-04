import { createClient } from "@/utils/supabase/server";
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  noStore();
  const supabase = await createClient();
  const { data: settings } = await supabase.from('chatbot_settings').select('*').single();
  const { data: quickActions } = await supabase.from('chatbot_quick_actions').select('*').order('order_index', { ascending: true });
  
  return Response.json({ settings, quickActions });
}
