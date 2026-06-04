"use client";

import { useState } from "react";
import { MessageSquare, LayoutTemplate, Zap, BookOpen, UserPlus, Save, Trash2, Plus } from "lucide-react";
import { updateChatbotSettings, addQuickAction, deleteQuickAction, addKnowledgeDocument, deleteKnowledgeDocument } from "./actions";

export default function ChatbotAdminManager({ settings, quickActions, knowledgeDocs, leads }) {
  const [activeTab, setActiveTab] = useState("appearance");
  const [isSaving, setIsSaving] = useState(false);
  const [brandColor, setBrandColor] = useState(settings?.brand_color || "#dc2626");
  const [isEnabled, setIsEnabled] = useState(settings?.is_enabled ?? true);
  const [leadName, setLeadName] = useState(settings?.lead_name_enabled ?? true);
  const [leadEmail, setLeadEmail] = useState(settings?.lead_email_enabled ?? true);
  const [leadPhone, setLeadPhone] = useState(settings?.lead_phone_enabled ?? false);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.target);
    await updateChatbotSettings(formData);
    setIsSaving(false);
    alert("Settings saved successfully!");
  };

  const renderTabs = () => {
    const tabs = [
      { id: "appearance", name: "Widget Appearance", icon: LayoutTemplate },
      { id: "ai", name: "AI & Prompts", icon: MessageSquare },
      { id: "actions", name: "Quick Actions", icon: Zap },
      { id: "knowledge", name: "Knowledge Base", icon: BookOpen },
      { id: "leads", name: "Lead Capture", icon: UserPlus },
      { id: "leads-data", name: "Leads Collected", icon: UserPlus },
    ];

    return (
      <div className="flex space-x-1 bg-white border-b border-gray-200 p-2 mb-6 rounded-t-lg">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-brand-red text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {tab.name}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900">Chatbot CRM</h1>
        <p className="text-gray-500 mt-2">Manage your AI assistant, knowledge base, and lead generation settings.</p>
      </div>

      {renderTabs()}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* SETTINGS FORMS */}
        {(activeTab === "appearance" || activeTab === "ai" || activeTab === "leads") && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <input type="hidden" name="id" value={settings.id} />

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold border-b pb-2">Widget Appearance</h2>
                
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
                  <div>
                    <h3 className="font-bold">Enable Chatbot</h3>
                    <p className="text-sm text-gray-500">Toggle whether the chatbot appears on the website.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="hidden" name="is_enabled" value={isEnabled ? "true" : "false"} />
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={isEnabled} 
                      onChange={(e) => setIsEnabled(e.target.checked)} 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-red"></div>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Widget Title</label>
                    <input type="text" name="widget_title" defaultValue={settings.widget_title} className="w-full border border-gray-300 rounded-md px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand Color (Hex)</label>
                    <div className="flex space-x-2">
                      <input type="color" name="brand_color" value={brandColor} onChange={e => setBrandColor(e.target.value)} className="h-10 w-10 p-1 border border-gray-300 rounded-md" />
                      <input type="text" value={brandColor} className="flex-1 border border-gray-300 rounded-md px-3 py-2" readOnly />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Widget Subtitle</label>
                    <input type="text" name="widget_subtitle" defaultValue={settings.widget_subtitle} className="w-full border border-gray-300 rounded-md px-3 py-2" />
                  </div>
                </div>
              </div>
            )}

            {/* AI & Prompts Tab */}
            {activeTab === "ai" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold border-b pb-2">AI Configuration</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Welcome Message</label>
                  <textarea name="welcome_message" defaultValue={settings.welcome_message} rows={2} className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">System Prompt (Base AI Instructions)</label>
                  <textarea name="knowledge_base" defaultValue={settings.knowledge_base} rows={6} className="w-full border border-gray-300 rounded-md px-3 py-2 font-mono text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Offline Message</label>
                    <input type="text" name="offline_message" defaultValue={settings.offline_message} className="w-full border border-gray-300 rounded-md px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fallback Message</label>
                    <input type="text" name="fallback_message" defaultValue={settings.fallback_message} className="w-full border border-gray-300 rounded-md px-3 py-2" />
                  </div>
                </div>
              </div>
            )}

            {/* Lead Capture Tab */}
            {activeTab === "leads" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold border-b pb-2">Lead Generation Settings</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lead Capture Message</label>
                  <input type="text" name="lead_capture_message" defaultValue={settings.lead_capture_message} className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-bold text-sm">Required Form Fields</h3>
                  
                  <div className="flex items-center">
                    <input type="hidden" name="lead_name_enabled" value={leadName ? "true" : "false"} />
                    <input type="checkbox" checked={leadName} onChange={e => setLeadName(e.target.checked)} className="h-4 w-4 text-brand-red border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-900">Require Name</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="hidden" name="lead_email_enabled" value={leadEmail ? "true" : "false"} />
                    <input type="checkbox" checked={leadEmail} onChange={e => setLeadEmail(e.target.checked)} className="h-4 w-4 text-brand-red border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-900">Require Email</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="hidden" name="lead_phone_enabled" value={leadPhone ? "true" : "false"} />
                    <input type="checkbox" checked={leadPhone} onChange={e => setLeadPhone(e.target.checked)} className="h-4 w-4 text-brand-red border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-900">Require Phone</label>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <button disabled={isSaving} type="submit" className="bg-brand-red text-white px-6 py-2 rounded-md hover:bg-red-700 flex items-center">
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        )}

        {/* QUICK ACTIONS TAB */}
        {activeTab === "actions" && (
          <div>
            <h2 className="text-xl font-bold border-b pb-4 mb-6">Manage Quick Actions</h2>
            
            <form action={addQuickAction} className="bg-gray-50 p-4 rounded-lg border mb-8">
              <h3 className="font-bold mb-3 text-sm">Add New Quick Action</h3>
              <div className="flex space-x-2">
                <input type="text" name="label" placeholder="Button Label (e.g. Request Quote)" className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm" required />
                <input type="text" name="action_text" placeholder="Hidden Text sent to AI" className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm" required />
                <input type="number" name="order_index" placeholder="Order" defaultValue={0} className="w-20 border border-gray-300 rounded-md px-3 py-2 text-sm" />
                <button type="submit" className="bg-brand-black text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> Add
                </button>
              </div>
            </form>

            <div className="space-y-2">
              {quickActions.map(action => (
                <div key={action.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                  <div className="flex space-x-4">
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">Order: {action.order_index}</span>
                    <span className="font-bold">{action.label}</span>
                    <span className="text-gray-500 italic text-sm">→ "{action.action_text}"</span>
                  </div>
                  <form action={() => deleteQuickAction(action.id)}>
                    <button type="submit" className="text-red-500 hover:text-red-700 p-1"><Trash2 className="h-4 w-4" /></button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KNOWLEDGE BASE TAB */}
        {activeTab === "knowledge" && (
          <div>
            <h2 className="text-xl font-bold border-b pb-4 mb-6">Manage Knowledge Base Documents</h2>
            
            <form action={addKnowledgeDocument} className="bg-gray-50 p-4 rounded-lg border mb-8 space-y-3">
              <h3 className="font-bold text-sm">Add New Document</h3>
              <input type="text" name="title" placeholder="Document Title (e.g. Refund Policy)" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" required />
              <textarea name="content" placeholder="Paste the content here... The AI will read this." rows={4} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" required />
              <button type="submit" className="bg-brand-black text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center">
                <Plus className="h-4 w-4 mr-1" /> Add Document
              </button>
            </form>

            <div className="space-y-4">
              {knowledgeDocs.map(doc => (
                <div key={doc.id} className="p-4 border rounded-md bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold">{doc.title}</h4>
                    <form action={() => deleteKnowledgeDocument(doc.id)}>
                      <button type="submit" className="text-red-500 hover:text-red-700 text-sm flex items-center"><Trash2 className="h-3 w-3 mr-1" /> Delete</button>
                    </form>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">{doc.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEADS DATA TAB */}
        {activeTab === "leads-data" && (
          <div>
            <h2 className="text-xl font-bold border-b pb-4 mb-6">Leads Collected by Chatbot</h2>
            <div className="overflow-x-auto">
              {(!leads || leads.length === 0) ? (
                <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg border">
                  No chatbot leads collected yet.
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chat History snippet</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(lead.created_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {lead.name || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>Email: {lead.email || '-'}</div>
                          <div>Phone: {lead.phone || '-'}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-md">
                          <div className="h-20 overflow-y-auto bg-gray-50 p-2 rounded border border-gray-100 text-xs">
                            {lead.chat_history?.filter(m => m.role !== 'system').map((m, i) => (
                              <div key={i} className="mb-1">
                                <strong className={m.role === 'user' ? 'text-blue-600' : 'text-green-600'}>
                                  {m.role === 'user' ? 'User' : 'AI'}:
                                </strong>{' '}
                                {m.content}
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
