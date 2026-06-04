import { createClient } from "@/utils/supabase/server";
import { PlusCircle } from "lucide-react";
import IndustryForm from "./IndustryForm";
import { addIndustry } from "./actions";

export default async function IndustriesCMSPage() {
  const supabase = await createClient();

  const { data: industries } = await supabase
    .from('industries')
    .select('*')
    .order('order_index', { ascending: true });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-brand-black">Industries We Serve</h1>
        <p className="text-gray-500 mt-1">Manage the industry cards displayed on the Industries page.</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-xl font-bold text-brand-black">Industry Cards</h2>
          <form action={addIndustry}>
            <button type="submit" className="flex items-center text-sm bg-brand-red text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Industry
            </button>
          </form>
        </div>

        <div className="space-y-6">
          {industries?.map((ind) => (
            <IndustryForm key={ind.id} industry={ind} />
          ))}
          
          {(!industries || industries.length === 0) && (
            <p className="text-gray-500 text-center py-8">No industries found. Click "Add Industry" to create one.</p>
          )}
        </div>
      </div>
    </div>
  );
}
