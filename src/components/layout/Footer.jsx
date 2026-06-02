import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-gray-300 py-12 lg:py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Company */}
          <div className="space-y-4">
            <Link href="/" className="inline-block font-heading font-bold text-2xl text-white tracking-tight">
              Ushnik Technologies<span className="text-brand-red">.</span>
            </Link>
            <p className="text-sm text-gray-400">
              Strategic Technology & Infrastructure Partner
            </p>
            <div className="pt-4 space-y-2 text-sm">
              <p>
                <a href="mailto:contact@ushniktechnologies.com" className="hover:text-brand-red transition-colors">
                  contact@ushniktechnologies.com
                </a>
              </p>
              <p>
                <a href="tel:+917702901217" className="hover:text-brand-red transition-colors">
                  +91 77029 01217
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
            <ul className="space-y-2 text-sm mb-6">
              <li><Link href="/about" className="hover:text-brand-red transition-colors">About Us</Link></li>
              <li><Link href="/industries" className="hover:text-brand-red transition-colors">Industries</Link></li>
              <li><Link href="/assessment" className="hover:text-brand-red transition-colors">Assessment Form</Link></li>
              <li><Link href="/partners" className="hover:text-brand-red transition-colors">Partners</Link></li>
              <li><Link href="/careers" className="hover:text-brand-red transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-brand-red transition-colors">Contact</Link></li>
            </ul>
            <div className="pt-6 border-t border-gray-800 space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-brand-red transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-brand-red transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-brand-red transition-colors">Disclaimer</Link></li>
            </div>
          </div>
          
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 Ushnik Technologies Pvt. Ltd. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">Made in India</p>
        </div>
      </div>
    </footer>
  );
}
