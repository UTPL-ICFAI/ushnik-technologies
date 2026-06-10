"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, Check, X, ChevronUp, ChevronDown, Power } from "lucide-react";
import toast from "react-hot-toast";
import { 
  addSocialMediaLink, 
  updateSocialMediaLink, 
  deleteSocialMediaLink, 
  toggleSocialMediaActive,
  updateSocialMediaOrder 
} from "./socialActions";

// Common React Icons for Social Media
const ICON_OPTIONS = [
  { name: "FaLinkedinIn", label: "LinkedIn" },
  { name: "FaInstagram", label: "Instagram" },
  { name: "FaYoutube", label: "YouTube" },
  { name: "FaFacebookF", label: "Facebook" },
  { name: "FaXTwitter", label: "X (Twitter)" },
  { name: "FaWhatsapp", label: "WhatsApp" },
  { name: "FaTelegramPlane", label: "Telegram" },
  { name: "FaGithub", label: "GitHub" },
];

export default function SocialMediaManager({ initialLinks }) {
  const [links, setLinks] = useState(initialLinks || []);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("is_active", "true");
    formData.append("order_index", links.length.toString());

    toast.promise(
      addSocialMediaLink(formData).then(res => {
        if (!res.success) throw new Error(res.error);
        // Optimistic refresh would go here, but server revalidation will handle it on next navigation. 
        // We will just force a hard refresh or let the parent re-fetch.
        window.location.reload(); 
        return res;
      }),
      {
        loading: 'Adding link...',
        success: 'Platform added!',
        error: (err) => `Failed: ${err.message}`
      }
    );
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const currentLink = links.find(l => l.id === id);
    formData.append("is_active", currentLink.is_active.toString());

    toast.promise(
      updateSocialMediaLink(id, formData).then(res => {
        if (!res.success) throw new Error(res.error);
        window.location.reload();
        return res;
      }),
      {
        loading: 'Updating...',
        success: 'Platform updated!',
        error: (err) => `Failed: ${err.message}`
      }
    );
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this social link?")) return;
    toast.promise(
      deleteSocialMediaLink(id).then(res => {
        if (!res.success) throw new Error(res.error);
        window.location.reload();
        return res;
      }),
      {
        loading: 'Deleting...',
        success: 'Platform deleted!',
        error: (err) => `Failed: ${err.message}`
      }
    );
  };

  const handleToggleActive = async (id, currentState) => {
    toast.promise(
      toggleSocialMediaActive(id, currentState).then(res => {
        if (!res.success) throw new Error(res.error);
        setLinks(links.map(l => l.id === id ? { ...l, is_active: !currentState } : l));
        return res;
      }),
      {
        loading: 'Updating status...',
        success: 'Status updated!',
        error: (err) => `Failed: ${err.message}`
      }
    );
  };

  const moveOrder = async (index, direction) => {
    const newLinks = [...links];
    if (direction === 'up' && index > 0) {
      [newLinks[index - 1], newLinks[index]] = [newLinks[index], newLinks[index - 1]];
    } else if (direction === 'down' && index < newLinks.length - 1) {
      [newLinks[index + 1], newLinks[index]] = [newLinks[index], newLinks[index + 1]];
    } else {
      return;
    }
    
    setLinks(newLinks); // optimistic UI update
    
    toast.promise(
      updateSocialMediaOrder(newLinks).then(res => {
        if (!res.success) throw new Error(res.error);
        return res;
      }),
      {
        loading: 'Saving order...',
        success: 'Order saved!',
        error: 'Failed to update order'
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold font-heading text-brand-black">Social Media Management</h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center text-sm font-medium text-brand-red hover:text-red-700 transition-colors"
        >
          {isAdding ? <X className="h-4 w-4 mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
          {isAdding ? "Cancel" : "Add Platform"}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Platform Name</label>
              <input type="text" name="platform_name" required placeholder="e.g. LinkedIn" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-brand-red outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Profile URL</label>
              <input type="url" name="url" required placeholder="https://..." className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-brand-red outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Icon Select</label>
              <select name="icon_name" required className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-brand-red outline-none">
                {ICON_OPTIONS.map(icon => <option key={icon.name} value={icon.name}>{icon.label} ({icon.name})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Brand Hover Color (Hex)</label>
              <input type="text" name="brand_color" placeholder="#0a66c2" defaultValue="#000000" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-brand-red outline-none" />
            </div>
          </div>
          <button type="submit" className="bg-brand-red text-white px-4 py-2 text-sm rounded-md hover:bg-red-700 transition-colors">
            Save Platform
          </button>
        </form>
      )}

      {links.length === 0 && !isAdding ? (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
          No social media links found. Add one or run the database migration.
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link, index) => (
            <div key={link.id} className={`flex items-center justify-between p-4 bg-white border ${link.is_active ? 'border-gray-200 shadow-sm' : 'border-gray-200 bg-gray-50 opacity-75'} rounded-lg transition-all`}>
              
              {/* ORDER BUTTONS */}
              <div className="flex flex-col space-y-1 mr-4">
                <button onClick={() => moveOrder(index, 'up')} disabled={index === 0} className="text-gray-400 hover:text-brand-black disabled:opacity-30"><ChevronUp className="h-4 w-4" /></button>
                <button onClick={() => moveOrder(index, 'down')} disabled={index === links.length - 1} className="text-gray-400 hover:text-brand-black disabled:opacity-30"><ChevronDown className="h-4 w-4" /></button>
              </div>

              {/* CONTENT / EDIT FORM */}
              <div className="flex-grow">
                {editingId === link.id ? (
                  <form id={`edit-form-${link.id}`} onSubmit={(e) => handleUpdate(e, link.id)} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mr-4">
                    <input type="text" name="platform_name" defaultValue={link.platform_name} required className="px-2 py-1 text-sm border border-gray-300 rounded" />
                    <input type="url" name="url" defaultValue={link.url} required className="px-2 py-1 text-sm border border-gray-300 rounded" />
                    <select name="icon_name" defaultValue={link.icon_name} className="px-2 py-1 text-sm border border-gray-300 rounded">
                      {ICON_OPTIONS.map(icon => <option key={icon.name} value={icon.name}>{icon.label} ({icon.name})</option>)}
                    </select>
                    <input type="text" name="brand_color" defaultValue={link.brand_color} className="px-2 py-1 text-sm border border-gray-300 rounded" />
                  </form>
                ) : (
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 text-sm flex items-center">
                      {link.platform_name} 
                      {!link.is_active && <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Disabled</span>}
                    </span>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-brand-red truncate max-w-xs">{link.url}</a>
                  </div>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex items-center space-x-2 shrink-0">
                {editingId === link.id ? (
                  <>
                    <button type="submit" form={`edit-form-${link.id}`} className="p-1.5 text-green-600 hover:bg-green-50 rounded"><Check className="h-4 w-4" /></button>
                    <button onClick={() => setEditingId(null)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"><X className="h-4 w-4" /></button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => handleToggleActive(link.id, link.is_active)} 
                      title={link.is_active ? "Disable" : "Enable"}
                      className={`p-1.5 rounded ${link.is_active ? 'text-gray-500 hover:bg-gray-100' : 'text-green-600 hover:bg-green-50'}`}
                    >
                      <Power className="h-4 w-4" />
                    </button>
                    <button onClick={() => setEditingId(link.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(link.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="h-4 w-4" /></button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
