import { createClient } from "@/utils/supabase/server";
import ChatbotAdminManager from "./ChatbotAdminManager";

export const metadata = {
  title: "Chatbot CRM - Admin Portal",
};

export const dynamic = 'force-dynamic';

export default async function ChatbotAdminPage() {
  const supabase = await createClient();

  // Fetch all necessary chatbot data
  const { data: settings } = await supabase.from('chatbot_settings').select('*').single();
  const { data: quickActions } = await supabase.from('chatbot_quick_actions').select('*').order('order_index', { ascending: true });
  const { data: knowledgeDocs } = await supabase.from('chatbot_knowledge_documents').select('*').order('created_at', { ascending: false });
  const { data: leads } = await supabase.from('chatbot_leads').select('*').order('created_at', { ascending: false });

  // Ensure default settings object exists if not found
  const defaultSettings = settings || {
    is_enabled: true,
    welcome_message: "",
    widget_title: "Ushnik AI",
    widget_subtitle: "",
    brand_color: "#dc2626",
    lead_name_enabled: true,
    lead_email_enabled: true,
    lead_phone_enabled: false,
    lead_capture_message: "",
    offline_message: "",
    fallback_message: "",
    knowledge_base: ""
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <ChatbotAdminManager 
        settings={defaultSettings} 
        quickActions={quickActions || []} 
        knowledgeDocs={knowledgeDocs || []} 
        leads={leads || []}
      />
    </div>
  );
}
