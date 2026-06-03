import { createClient } from "@/utils/supabase/server";
import { Users, FileText, Layers, Mail } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch some stats for the dashboard overview
  const { count: servicesCount } = await supabase.from('services').select('*', { count: 'exact', head: true });
  const { count: formsCount } = await supabase.from('form_submissions').select('*', { count: 'exact', head: true });

  const stats = [
    { name: 'Total Services', stat: servicesCount || 0, icon: Layers },
    { name: 'Form Submissions', stat: formsCount || 0, icon: Mail },
    { name: 'Pages Configured', stat: 3, icon: FileText },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold font-heading text-brand-black mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{item.stat}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-medium text-brand-black mb-4">Welcome to the Ushnik CMS</h2>
        <p className="text-gray-600 mb-4">
          From this dashboard, you can manage all the content on your website without touching any code.
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li><strong>Services:</strong> Add, edit, or remove the services listed on the Infrastructure and Software pages.</li>
          <li><strong>Hero & Content:</strong> Update the large headings and text on the Home, Infrastructure, and Software pages.</li>
          <li><strong>Form Submissions:</strong> View contact and assessment requests securely.</li>
          <li><strong>Global Settings:</strong> Update the company name, footer text, contact email, and phone number globally.</li>
        </ul>
      </div>
    </div>
  );
}
