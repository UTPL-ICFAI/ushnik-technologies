import Link from "next/link";
import { Server, Cloud, Building2, Network, Handshake, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Infrastructure & Data Center Division | Ushnik Technologies",
  description: "End-to-end infrastructure advisory, cloud optimization, colocation, and IXP ecosystems.",
};

const SERVICES = [
  {
    id: "consulting",
    icon: <Building2 className="h-10 w-10 text-brand-red mb-4" />,
    title: "Data Center Planning & Feasibility Studies",
    description: "We support organizations, investors, and real estate developers entering the data center business with complete end-to-end advisory:",
    list: [
      "Feasibility Study & Market Analysis for new DC projects",
      "Detailed Project Report (DPR) preparation",
      "Site selection and due diligence",
      "Power, cooling, and connectivity infrastructure planning",
      "Regulatory and licensing roadmap",
      "Financial modeling and ROI projections",
      "Carrier-neutral architecture design (MMR, cross-connects, fiber diversity)",
      "IXP readiness planning and BGP/ASN advisory",
      "Vendor evaluation and procurement support",
      "Go-to-market strategy for carrier and enterprise customer acquisition"
    ]
  },
  {
    id: "cloud",
    icon: <Cloud className="h-10 w-10 text-brand-red mb-4" />,
    title: "Reduce Infrastructure Costs. Improve Performance.",
    description: "Are you paying high monthly bills for cloud, hosting, or infrastructure? Ushnik Technologies helps startups and enterprises optimize infrastructure costs through cost-effective alternatives:",
    list: [
      "Cloud cost audit and rightsizing (AWS, Azure, GCP, Oracle Cloud)",
      "Migration from expensive or underutilized infrastructure",
      "Hybrid cloud architecture design",
      "On-premise to cloud or DC migration planning",
      "Colocation evaluation and migration support",
      "Backup and Disaster Recovery (DR) solution design",
      "Multi-cloud strategy and vendor-neutral advisory",
      "Infrastructure architecture and HLD/LLD review"
    ],
    footer: "Through our ecosystem of trusted Data Center and Cloud partnerships, we analyze your current infrastructure usage and help you reduce monthly costs, improve performance, and build resilience — without compromising reliability."
  },
  {
    id: "colocation",
    icon: <Server className="h-10 w-10 text-brand-red mb-4" />,
    title: "Colocation & Carrier Hotel Services",
    description: "Connecting enterprises with carrier-neutral colocation facilities across India:",
    list: [
      "Rack, cage, and suite colocation planning",
      "Cross-connect and Meet-Me Room (MMR) advisory",
      "Power and cooling requirement assessment",
      "SLA evaluation and vendor comparison",
      "Remote hands and managed services coordination"
    ]
  },
  {
    id: "ixp",
    icon: <Network className="h-10 w-10 text-brand-red mb-4" />,
    title: "IXP & Interconnection Advisory",
    description: "Strategic guidance for robust internet and network exchanges:",
    list: [
      "Internet Exchange Point (IXP) planning and ecosystem development",
      "ASN and IP address resource planning (IRINN/APNIC)",
      "BGP peering strategy and route server design",
      "Carrier and ISP interconnection advisory",
      "CDN integration planning (Cloudflare, Akamai, Google)",
      "PeeringDB registration and global peering community engagement"
    ]
  },
  {
    id: "partnerships",
    icon: <Handshake className="h-10 w-10 text-brand-red mb-4" />,
    title: "DC Partnerships & Collaborations",
    description: "We actively build and facilitate partnerships between:",
    list: [
      "Data center operators and enterprise end-users",
      "Cloud providers and colocation facilities",
      "ISPs and carrier-neutral hubs",
      "Technology vendors and DC operators",
      "Investors and greenfield DC developers"
    ],
    footer: "Building meaningful partnerships across the global digital infrastructure landscape. If you are a data center operator, cloud provider, ISP, or enterprise seeking connectivity — connect with us."
  }
];

export default function InfrastructurePage() {
  return (
    <div className="bg-brand-gray min-h-screen">
      {/* PAGE HERO */}
      <section className="bg-brand-black text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6">Infrastructure & Data Center Division</h1>
          <p className="text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Building the backbone of India's digital future — through carrier-neutral data centers, cloud partnerships, IXP ecosystems, and end-to-end infrastructure advisory.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
          {SERVICES.map((service, index) => (
            <div key={service.id} id={service.id} className={`flex flex-col lg:flex-row gap-8 lg:gap-16 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''} items-start`}>
              <div className="lg:w-1/3 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                {service.icon}
                <h2 className="text-2xl font-heading font-bold text-brand-black mb-4">{service.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
              
              <div className="lg:w-2/3">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.list.map((item, idx) => (
                    <li key={idx} className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-red mt-2 mr-3"></div>
                      <span className="text-gray-800 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                {service.footer && (
                  <div className="mt-6 p-6 bg-brand-black text-white rounded-lg border-l-4 border-brand-red">
                    <p className="text-sm text-gray-300 leading-relaxed">{service.footer}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-white py-20 lg:py-28 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-brand-black mb-6">Start With a Free Infrastructure Assessment</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Share your current infrastructure and hosting details to receive a customized infrastructure optimization recommendation from Ushnik Technologies. Our team evaluates cost, performance, scalability, backup, and disaster recovery requirements to suggest more efficient and cost-effective infrastructure options.
          </p>
          <p className="text-gray-800 font-semibold mb-10">
            Whether you are on AWS, Azure, GCP, private cloud, local servers, VPS, or data centers — we can help identify a more efficient and cost-effective solution.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-md text-white bg-brand-red hover:bg-red-700 shadow-lg hover:shadow-xl transition-all"
          >
            Start Free Assessment <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
