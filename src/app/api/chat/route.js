import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { createClient } from '@/utils/supabase/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const supabase = await createClient();
    const { data: settings } = await supabase.from('chatbot_settings').select('*').single();
    const { data: knowledgeDocs } = await supabase.from('chatbot_knowledge_documents').select('title, content');

    if (settings && !settings.is_enabled) {
      return new Response("Chatbot is currently disabled.", { status: 403 });
    }

    let systemPrompt = settings?.knowledge_base || "You are a helpful AI assistant for Ushnik Technologies. You help users understand our Infrastructure and Software services.";

    if (knowledgeDocs && knowledgeDocs.length > 0) {
      systemPrompt += "\n\n--- COMPANY KNOWLEDGE BASE ---\nUse the following verified information to answer user questions:\n\n";
      knowledgeDocs.forEach(doc => {
        systemPrompt += `Document Title: ${doc.title}\nContent:\n${doc.content}\n\n`;
      });
      systemPrompt += "--- END OF KNOWLEDGE BASE ---\nRemember to only use the provided knowledge base if it is relevant. If the user asks something completely outside this scope, politely decline or ask for their contact info.";
    }

    systemPrompt += "\n\nCRITICAL INSTRUCTION: Keep your responses short, concise, and easy to read. Use bullet points or short paragraphs where applicable. Avoid long-winded explanations. Provide a great interface experience by formatting your text nicely.";

    const result = await streamText({
      model: google('gemini-2.5-flash'),
      messages: messages.map(m => ({
        ...m,
        // Convert any custom 'system' messages from the UI (like lead capture) to user messages to avoid API rejection
        role: m.role === 'system' ? 'user' : m.role
      })),
      system: systemPrompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: error.message || error.toString() }), { status: 500 });
  }
}
