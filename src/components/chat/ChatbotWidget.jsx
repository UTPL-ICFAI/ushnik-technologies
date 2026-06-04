"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, User, Bot, Loader2, UserPlus } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import ReactMarkdown from "react-markdown";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const [quickActions, setQuickActions] = useState([]);
  
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const processChatResponse = async (chatMessages) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatMessages })
      });
      
      if (!res.ok) throw new Error("Failed to send message");
      
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let text = "";
      
      const assistantMsgId = Date.now().toString();
      setMessages(prev => [
        ...prev,
        { id: assistantMsgId, role: 'assistant', content: "" }
      ]);
      
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          text += decoder.decode(value, { stream: true });
          setMessages(prev => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            if (updated[lastIdx].id === assistantMsgId) {
              updated[lastIdx] = { ...updated[lastIdx], content: text };
            }
            return updated;
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput("");
    
    // Check if we need to capture leads first
    const needsLeadCapture = settings?.lead_name_enabled || settings?.lead_email_enabled || settings?.lead_phone_enabled;
    if (needsLeadCapture && !isLeadCaptured) {
      setShowLeadForm(true);
      return;
    }

    await processChatResponse(newMessages);
  };
  
  // Lead form state
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", email: "", phone: "" });
  const [isLeadCaptured, setIsLeadCaptured] = useState(false);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/chatbot-config?t=${Date.now()}`);
        const data = await res.json();
        if (data.settings) setSettings(data.settings);
        if (data.quickActions) setQuickActions(data.quickActions);
      } catch (err) {
        console.error("Failed to fetch chatbot config", err);
      }
    };
    if (isOpen) {
      fetchData();
    } else if (!settings) {
      fetchData(); // Initial load
    }
  }, [isOpen]);

  // Auto-scroll to bottom when new messages arrive or loading state changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, showLeadForm, isLoading]);

  const handleQuickAction = (actionText) => {
    setInput(actionText);
    setTimeout(() => {
      document.getElementById('chatbot-submit-btn')?.click();
    }, 50);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    const supabase = createClient();
    await supabase.from('chatbot_leads').insert({
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      chat_history: messages
    });
    setIsLeadCaptured(true);
    setShowLeadForm(false);
    
    // Resume normal chat flow by sending a hidden confirmation to the AI
    const sysMsg = { id: Date.now().toString(), role: 'system', content: 'Lead captured successfully.' };
    const newMessages = [...messages, sysMsg];
    setMessages(newMessages);
    await processChatResponse(newMessages);
  };

  const handleSkipLead = async () => {
    setIsLeadCaptured(true); // Don't ask again this session
    setShowLeadForm(false);
    await processChatResponse(messages);
  };

  // If disabled in admin, or still loading, don't render anything
  if (!settings) return null;
  if (!settings.is_enabled) return null;

  const brandColor = settings?.brand_color || "#dc2626";
  const widgetPosition = settings?.position === "left" ? "left-6" : "right-6";
  const panelPosition = settings?.position === "left" ? "left-0" : "right-0";

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className={`
          fixed sm:absolute 
          bottom-20 left-4 right-4 sm:bottom-16 sm:left-auto sm:${panelPosition} sm:w-96 
          bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col 
          h-[80dvh] sm:h-[550px] sm:max-h-[85vh] z-[60]
        `}>
          {/* Header */}
          <div style={{ backgroundColor: brandColor }} className="text-white p-4 flex justify-between items-center flex-shrink-0">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-white" />
                <h3 className="font-heading font-bold text-lg">{settings?.widget_title || 'Ushnik AI Assistant'}</h3>
              </div>
              {settings?.widget_subtitle && (
                <p className="text-xs text-white/80 mt-1">{settings.widget_subtitle}</p>
              )}
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {/* Welcome Message */}
            {settings?.welcome_message && messages.length === 0 && (
              <div className="flex items-start space-x-3">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Bot className="h-4 w-4" style={{ color: brandColor }} />
                </div>
                <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm text-sm text-gray-700 border border-gray-100">
                  {settings.welcome_message}
                </div>
              </div>
            )}

            {/* Quick Actions (only show if no messages sent yet) */}
            {messages.length === 0 && quickActions.length > 0 && !showLeadForm && (
              <div className="flex flex-wrap gap-2 mt-4">
                {quickActions.map(qa => (
                  <button
                    key={qa.id}
                    onClick={() => handleQuickAction(qa.action_text)}
                    className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    {qa.label}
                  </button>
                ))}
              </div>
            )}

            {/* Chat History */}
            {messages.filter(m => m.role !== 'system').map((m, i) => (
              <div key={m.id || i} className={`flex items-start space-x-3 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-2 rounded-full shadow-sm ${m.role === 'user' ? 'text-white' : 'bg-white'}`} style={m.role === 'user' ? { backgroundColor: brandColor } : {}}>
                  {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" style={{ color: brandColor }} />}
                </div>
                <div className={`p-3 rounded-xl shadow-sm text-sm max-w-[80%] ${
                  m.role === 'user' 
                    ? 'text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none prose prose-sm max-w-none'
                }`} style={m.role === 'user' ? { backgroundColor: brandColor } : {}}>
                  {m.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  ) : (
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin" style={{ color: brandColor }} />
                </div>
              </div>
            )}

            {/* Lead Capture Form injection */}
            {showLeadForm && !isLeadCaptured && (
              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <p className="text-sm font-bold text-gray-800 mb-2">{settings?.lead_capture_message || "Before we proceed, please share your details."}</p>
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  {settings?.lead_name_enabled && (
                    <input type="text" placeholder="Your Name" required className="w-full text-sm p-2 border rounded" value={leadData.name} onChange={e => setLeadData({...leadData, name: e.target.value})} />
                  )}
                  {settings?.lead_email_enabled && (
                    <input type="email" placeholder="Your Email" required className="w-full text-sm p-2 border rounded" value={leadData.email} onChange={e => setLeadData({...leadData, email: e.target.value})} />
                  )}
                  {settings?.lead_phone_enabled && (
                    <input type="tel" placeholder="Your Phone Number" required className="w-full text-sm p-2 border rounded" value={leadData.phone} onChange={e => setLeadData({...leadData, phone: e.target.value})} />
                  )}
                  <button type="submit" className="w-full text-white text-sm font-bold py-2 rounded mt-2 transition-opacity hover:opacity-90" style={{ backgroundColor: brandColor }}>Submit Details</button>
                  <button type="button" onClick={handleSkipLead} className="w-full text-gray-500 text-xs mt-1 py-1 hover:text-gray-700">Skip for now</button>
                </form>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex justify-between items-center mb-2 px-1">
              <button 
                type="button" 
                onClick={() => setShowLeadForm(!showLeadForm)}
                className="text-[10px] text-gray-400 hover:text-gray-600 flex items-center"
              >
                {!isLeadCaptured && <UserPlus className="h-3 w-3 mr-1" />}
                {!isLeadCaptured ? "Contact Sales" : "Details Submitted ✓"}
              </button>
              <span className="text-[10px] text-gray-400">Powered by AI</span>
            </div>
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1"
                style={{ '--tw-ring-color': brandColor, borderColor: input ? brandColor : undefined }}
              />
              <button 
                id="chatbot-submit-btn"
                type="submit" 
                disabled={!(input || '').trim() || isLoading}
                className={`p-2 rounded-full transition-colors ${!(input || '').trim() || isLoading ? 'bg-gray-300 text-white cursor-not-allowed' : 'text-white'}`}
                style={(input || '').trim() && !isLoading ? { backgroundColor: brandColor } : {}}
              >
                <Send className="h-4 w-4 m-1" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <div className={`fixed bottom-6 ${widgetPosition} z-[60]`}>
          <button
            onClick={() => setIsOpen(true)}
            style={{ backgroundColor: brandColor }}
            className="text-white p-4 rounded-full shadow-xl hover:scale-105 transition-transform flex items-center justify-center group"
          >
            <MessageSquare className="h-6 w-6" />
            {/* Notification Dot */}
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
            </span>
          </button>
        </div>
      )}
    </>
  );
}
