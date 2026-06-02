import Link from "next/link";
import { Handshake, Cloud, Server, Link2 } from "lucide-react";

export const metadata = {
  title: "Partners & Collaborations | Ushnik Technologies",
  description: "Explore our global ecosystem of data center, cloud, and technology partnerships.",
};

export default function PartnersPage() {
  return (
    <div className="bg-brand-gray min-h-screen pb-20">
      <section className="bg-brand-black text-white py-16 text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">Partners & Collaborations</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Our strength lies in our ecosystem. We collaborate with industry leaders to deliver robust, neutral, and scalable infrastructure solutions.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <Server className="h-10 w-10 text-brand-red mb-4" />
            <h2 className="text-xl font-bold text-brand-black mb-3">Data Center Partners</h2>
            <p className="text-gray-600 mb-4 text-sm">
              We collaborate with carrier-neutral data centers and colocation facilities across India, including major hubs in Mumbai, Chennai, Hyderabad, and Vizag.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <Cloud className="h-10 w-10 text-brand-red mb-4" />
            <h2 className="text-xl font-bold text-brand-black mb-3">Cloud Providers</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Our advisory spans across global hyperscalers and specialized cloud platforms, ensuring you get the most cost-effective and resilient deployment.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <Link2 className="h-10 w-10 text-brand-red mb-4" />
            <h2 className="text-xl font-bold text-brand-black mb-3">Carrier & ISP Networks</h2>
            <p className="text-gray-600 mb-4 text-sm">
              We actively facilitate interconnection between enterprises, ISPs, and IXPs to build robust, low-latency network architectures.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20 text-center max-w-3xl mx-auto px-4">
        <Handshake className="h-12 w-12 text-brand-black mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-brand-black mb-4">Become a Partner</h2>
        <p className="text-gray-600 mb-8">
          Are you a data center operator, cloud provider, or technology vendor? Let's collaborate to build the digital infrastructure of tomorrow.
        </p>
        <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-red hover:bg-red-700 transition-colors">
          Partner with Us
        </Link>
      </section>
    </div>
  );
}
