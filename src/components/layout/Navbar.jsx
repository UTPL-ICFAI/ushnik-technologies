"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Infrastructure Division", href: "/infrastructure" },
  { name: "Software Division", href: "/software" },
  { name: "About Us", href: "/about" },
  { name: "Industries", href: "/industries" },
  /*{ name: "Assessment Form", href: "/assessment" },*/
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-heading font-bold text-xl sm:text-2xl text-brand-black tracking-tight">
              Ushnik Technologies<span className="text-brand-red">.</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-brand-red transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-brand-red hover:bg-red-700 transition-colors"
              >
                Get Free Assessment
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-brand-black hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-brand-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-brand-red hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/assessment"
              onClick={() => setIsOpen(false)}
              className="block sm:hidden px-3 py-2 mt-4 text-center rounded-md text-base font-medium text-white bg-brand-red hover:bg-red-700"
            >
              Get Free Assessment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
