import { createClient } from "@/utils/supabase/server";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-body">
      <AdminSidebar user={user} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
