import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { LayoutDashboard, FileText, Settings, Layers, Mails, LogOut } from "lucide-react";

export default async function AdminLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-body">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-brand-black text-white flex flex-col hidden md:flex min-h-screen border-r border-gray-800">
        <div className="p-6 border-b border-gray-800">
          <Link href="/admin" className="block mb-2">
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

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center px-4 py-3 text-sm rounded-md hover:bg-gray-800 transition-colors">
            <LayoutDashboard className="h-4 w-4 mr-3 text-gray-400" />
            Dashboard
          </Link>
          <Link href="/admin/services" className="flex items-center px-4 py-3 text-sm rounded-md hover:bg-gray-800 transition-colors">
            <Layers className="h-4 w-4 mr-3 text-gray-400" />
            Services
          </Link>
          <Link href="/admin/content" className="flex items-center px-4 py-3 text-sm rounded-md hover:bg-gray-800 transition-colors">
            <FileText className="h-4 w-4 mr-3 text-gray-400" />
            Hero & Content
          </Link>
          <Link href="/admin/forms" className="flex items-center px-4 py-3 text-sm rounded-md hover:bg-gray-800 transition-colors">
            <Mails className="h-4 w-4 mr-3 text-gray-400" />
            Form Submissions
          </Link>
          <Link href="/admin/settings" className="flex items-center px-4 py-3 text-sm rounded-md hover:bg-gray-800 transition-colors">
            <Settings className="h-4 w-4 mr-3 text-gray-400" />
            Global Settings
          </Link>
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center px-8 md:hidden">
          <Link href="/admin">
            <Image
              src="/logo-1.png"
              alt="Ushnik Technologies"
              width={120}
              height={35}
              className="object-contain"
            />
          </Link>
        </header>
        <div className="p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
