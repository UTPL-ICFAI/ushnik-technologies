import Link from "next/link";
import { ArrowRight, Target, Eye, ShieldCheck, Link2 } from "lucide-react";

export const metadata = {
  title: "About Us | Ushnik Technologies",
  description: "Learn about Ushnik Technologies, our vision, mission, and how we serve as a strategic technology partner.",
};

export default function AboutPage() {
  return (
    <div className="bg-brand-white min-h-screen">
      {/* PAGE HERO */}
      <section className="bg-brand-black text-white py-20 lg:py-28 text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6">About Ushnik Technologies</h1>
        <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Your strategic partner for navigating the evolving digital economy through robust infrastructure and innovative software solutions.
        </p>
      </section>

      {/* COMPANY OVERVIEW */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold text-brand-black mb-6">Who We Are</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Ushnik Technologies Pvt. Ltd. is a technology and digital infrastructure company headquartered in India, delivering strategic advisory, technology services, and infrastructure solutions to enterprises, startups, and new business setups across India and globally.
              </p>
              <p>
                We operate through two primary divisions: the <strong>Infrastructure & Data Center Division</strong>, which focuses on cloud advisory, data center partnerships, colocation, IXP ecosystems, and feasibility consulting; and the <strong>Software & Technology Division</strong>, which covers product development, enterprise applications, cybersecurity, and IT staffing.
              </p>
              <p>
                Our strength lies in our ecosystem — a network of trusted data center operators, cloud providers, colocation facilities, ISPs, and technology partners that allows us to deliver neutral, best-fit recommendations to every client we engage with.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-brand-gray p-6 rounded-xl border border-gray-200">
              <Target className="h-10 w-10 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-2">Our Mission</h3>
              <p className="text-sm text-gray-600">
                To simplify infrastructure decisions, reduce technology costs, accelerate digital transformation, and enable global-standard connectivity for businesses of every size and industry.
              </p>
            </div>
            <div className="bg-brand-gray p-6 rounded-xl border border-gray-200 sm:mt-8">
              <Eye className="h-10 w-10 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-2">Our Vision</h3>
              <p className="text-sm text-gray-600">
                To be India's most trusted neutral technology and infrastructure advisory partner — connecting businesses with the right infrastructure, the right technology, and the right partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="bg-brand-black text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">What Makes Us Different</h2>
            <p className="text-gray-400">Our unique approach to delivering technology and infrastructure solutions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Neutral advisory — not tied to any single cloud or DC vendor",
              "Dual capability: Infrastructure + Software under one roof",
              "Global partnerships with data centers, cloud providers, and technology vendors",
              "German-engineered, performance-led infrastructure architectures",
              "Deep expertise in IXP, carrier hotel, and interconnection ecosystem development",
              "End-to-end support: feasibility, DPR, design, deployment, and optimization"
            ].map((point, index) => (
              <div key={index} className="flex items-start bg-gray-900 p-6 rounded-lg border border-gray-800">
                <ShieldCheck className="h-6 w-6 text-brand-red mr-4 flex-shrink-0" />
                <span className="text-gray-300 font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP (Placeholder) */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-heading font-bold text-brand-black mb-12">Leadership</h2>
        <div className="max-w-md mx-auto bg-brand-gray p-8 rounded-xl border border-gray-200">
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden border-2 border-brand-red">
            {/* Avatar placeholder */}
          </div>
          <h3 className="text-xl font-bold text-brand-black">[Founder Name]</h3>
          <p className="text-brand-red font-medium mb-4">[Designation]</p>
          <p className="text-gray-600 text-sm">
            [Brief bio placeholder — 2 to 3 sentences outlining their experience in technology and infrastructure.]
          </p>
        </div>
      </section>

      {/* PARTNERSHIPS */}
      <section className="bg-brand-gray py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link2 className="h-12 w-12 text-brand-black mx-auto mb-6" />
          <h2 className="text-3xl font-heading font-bold text-brand-black mb-8">Our Ecosystem</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-white px-6 py-3 rounded-full text-sm font-semibold border border-gray-300 shadow-sm">Partner Data Centers (Mumbai, Chennai, Hyderabad, Vizag)</span>
            <span className="bg-white px-6 py-3 rounded-full text-sm font-semibold border border-gray-300 shadow-sm">Global Cloud Partnership Ecosystem</span>
            <span className="bg-white px-6 py-3 rounded-full text-sm font-semibold border border-gray-300 shadow-sm">Carrier and ISP Network Collaborations</span>
          </div>
        </div>
      </section>
    </div>
  );
}
