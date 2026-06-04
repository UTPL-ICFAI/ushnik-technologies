import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us | Ushnik Technologies",
  description: "Get in touch with Ushnik Technologies for your infrastructure and software needs.",
};

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('global_settings').select('*').single();

  return (
    <div className="bg-brand-gray min-h-screen pb-20">
      {/* HEADER */}
      <section className="bg-brand-black text-white py-16 text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">Contact Us</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We are here to help you build, optimize, and scale your technology infrastructure. Reach out to us today.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col lg:flex-row">
          
          {/* CONTACT INFO */}
          <div className="lg:w-1/3 bg-brand-black text-white p-10 lg:p-12">
            <h2 className="text-2xl font-heading font-bold mb-8">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-brand-red mr-4 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Email</p>
                  <a href={`mailto:${settings?.contact_email || "contact@ushniktechnologies.com"}`} className="text-gray-400 hover:text-white transition-colors">{settings?.contact_email || "contact@ushniktechnologies.com"}</a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-brand-red mr-4 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Phone / WhatsApp</p>
                  <a href={`tel:${settings?.contact_phone?.replace(/\s+/g, '') || "+917702901217"}`} className="text-gray-400 hover:text-white transition-colors">{settings?.contact_phone || "+91 77029 01217"}</a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-brand-red mr-4 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Registered Office</p>
                  <p className="text-gray-400 leading-relaxed">{settings?.office_address || "8-2-269/3, Plot No: 3, 2nd Floor, Maharshi House, Banjara Hills Road No.2, Hyderabad, Telangana 500034"}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-brand-red mr-4 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Business Hours</p>
                  <p className="text-gray-400">Monday to Friday<br />9:00 AM – 6:30 PM IST</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-800">
              {settings?.linkedin_url ? (
                <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-brand-red hover:text-white transition-colors font-medium">
                  Follow us on LinkedIn
                </a>
              ) : (
                <span className="inline-flex items-center text-gray-500 font-medium">Connect with us on LinkedIn</span>
              )}
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:w-2/3 p-10 lg:p-12">
            <h2 className="text-2xl font-heading font-bold text-brand-black mb-6">Send us a message</h2>
            <ContactForm />
          </div>

        </div>
      </section>
    </div>
  );
}
