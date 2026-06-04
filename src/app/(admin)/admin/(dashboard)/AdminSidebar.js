"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Settings, Layers, Mails, LogOut, Menu, X, MessageSquare } from "lucide-react";

export default function AdminSidebar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Homepage", href: "/admin/home", icon: LayoutDashboard },
    { name: "About Us", href: "/admin/about", icon: FileText },
    { name: "Services", href: "/admin/services", icon: Layers },
    { name: "Industries", href: "/admin/industries", icon: Layers },
    { name: "Hero & Content", href: "/admin/content", icon: FileText },
    { name: "Form Submissions", href: "/admin/forms", icon: Mails },
    { name: "Global Settings", href: "/admin/settings", icon: Settings },
    { name: "Chatbot CRM", href: "/admin/chatbot", icon: MessageSquare },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex justify-between items-center px-4 md:hidden sticky top-0 z-20">
        <Link href="/admin">
          <Image
            src="/logo-1.png"
            alt="Ushnik Technologies"
            width={120}
            height={35}
            className="object-contain"
          />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 hover:text-brand-red focus:outline-none"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-brand-black text-white flex flex-col min-h-screen border-r border-gray-800 transition-transform transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:flex
      `}>
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <div>
            <Link href="/admin" className="block mb-2" onClick={() => setIsOpen(false)}>
              <Image
                src="/logo-2.png"
                alt="Ushnik Technologies"
                width={120}
                height={30}
                className="object-contain"
                priority
              />
            </Link>
            <span className="text-[10px] uppercase tracking-widest text-brand-red font-bold">Admin Portal</span>
            <p className="text-xs text-gray-400 mt-1 truncate">{user?.email}</p>
          </div>
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                  isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 mr-3 ${isActive ? "text-brand-red" : "text-gray-400"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <form action="/auth/signout" method="post">
            <button type="submit" className="flex items-center w-full px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
