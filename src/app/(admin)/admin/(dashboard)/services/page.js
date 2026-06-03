import { createClient } from "@/utils/supabase/server";
import ServiceForm from "./ServiceForm";
import CreateServiceWrapper from "./CreateServiceWrapper";

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('division', { ascending: true })
    .order('order_index', { ascending: true });

  const infraServices = services?.filter(s => s.division === 'infrastructure') || [];
  const softwareServices = services?.filter(s => s.division === 'software') || [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-brand-black">Manage Services</h1>
        <p className="text-gray-500 mt-1">Edit the service offerings displayed on the Infrastructure and Software pages.</p>
      </div>

      <CreateServiceWrapper />

      <div className="mb-12">
        <h2 className="text-xl font-bold text-brand-black mb-6 pb-2 border-b border-gray-200">Infrastructure Division</h2>
        <div className="space-y-6 max-w-4xl">
          {infraServices.map((service) => (
            <ServiceForm key={service.id} service={service} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-brand-black mb-6 pb-2 border-b border-gray-200">Software Division</h2>
        <div className="space-y-6 max-w-4xl">
          {softwareServices.map((service) => (
            <ServiceForm key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
