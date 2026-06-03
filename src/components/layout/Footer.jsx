import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

export default async function Footer() {
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from('global_settings')
    .select('*')
    .single();

  return (
    <footer className="bg-brand-black text-gray-300 py-12 lg:py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Column 1: Company */}
          <div className="space-y-4">
            <Link href="/" className="inline-block mb-2">
              <Image
                src="/logo 2.png"
                alt="Ushnik Technologies Logo"
                width={180}
                height={50}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-400">
              {settings?.tagline || "Strategic Technology & Infrastructure Partner"}
            </p>
            <div className="pt-4 space-y-2 text-sm">
              <p>
                <a href={`mailto:${settings?.contact_email || "contact@ushniktechnologies.com"}`} className="hover:text-brand-red transition-colors">
                  {settings?.contact_email || "contact@ushniktechnologies.com"}
                </a>
              </p>
              <p>
                <a href={`tel:${settings?.contact_phone?.replace(/\s+/g, '') || "+917702901217"}`} className="hover:text-brand-red transition-colors">
                  {settings?.contact_phone || "+91 77029 01217"}
                </a>
              </p>
              <p>
                <a href="https://www.ushniktechnologies.com" className="hover:text-brand-red transition-colors">
                  www.ushniktechnologies.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Infrastructure Division */}
          <div>
            <h3 className="font-heading font-bold text-lg text-white mb-4">Infrastructure Division</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/infrastructure#consulting" className="hover:text-brand-red transition-colors">Data Center Consulting</Link></li>
              <li><Link href="/infrastructure#cloud" className="hover:text-brand-red transition-colors">Cloud Optimization</Link></li>
              <li><Link href="/infrastructure#colocation" className="hover:text-brand-red transition-colors">Colocation</Link></li>
              <li><Link href="/infrastructure#ixp" className="hover:text-brand-red transition-colors">IXP Advisory</Link></li>
              <li><Link href="/infrastructure#partnerships" className="hover:text-brand-red transition-colors">DC Partnerships</Link></li>
              <li><Link href="/infrastructure#feasibility" className="hover:text-brand-red transition-colors">Feasibility & DPR</Link></li>
            </ul>
          </div>

          {/* Column 3: Software Division */}
          <div>
            <h3 className="font-heading font-bold text-lg text-white mb-4">Software Division</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/software#product-development" className="hover:text-brand-red transition-colors">Product Development</Link></li>
              <li><Link href="/software#cybersecurity" className="hover:text-brand-red transition-colors">Cybersecurity</Link></li>
              <li><Link href="/software#staffing" className="hover:text-brand-red transition-colors">IT Staffing</Link></li>
              <li><Link href="/software#enterprise-it" className="hover:text-brand-red transition-colors">Enterprise IT</Link></li>
              <li><Link href="/software#mobile-apps" className="hover:text-brand-red transition-colors">Web & Mobile Apps</Link></li>
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div>
            <h3 className="font-heading font-bold text-lg text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-brand-red transition-colors">About Us</Link></li>
              <li><Link href="/industries" className="hover:text-brand-red transition-colors">Industries</Link></li>
              <li><Link href="/assessment" className="hover:text-brand-red transition-colors">Assessment Form</Link></li>
              <li><Link href="/partners" className="hover:text-brand-red transition-colors">Partners</Link></li>
              <li><Link href="/careers" className="hover:text-brand-red transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-brand-red transition-colors">Contact</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col lg:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>{settings?.footer_text || "© 2025 Ushnik Technologies Pvt. Ltd. All Rights Reserved."}</p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center">
            <Link href="/privacy" className="hover:text-brand-red transition-colors">Privacy Policy</Link>
            <span className="hidden sm:inline">|</span>
            <Link href="/terms" className="hover:text-brand-red transition-colors">Terms of Service</Link>
            <span className="hidden sm:inline">|</span>
            <Link href="/disclaimer" className="hover:text-brand-red transition-colors">Disclaimer</Link>
          </div>
          <p>Made in India</p>
        </div>
      </div>
    </footer>
  );
}
