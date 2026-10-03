"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import AnnouncementBar from "./AnnouncementBar";

export default function StoreNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = 2; // Hardcoded for mockup

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop All", href: "/collections" },
    { name: "Lips", href: "/collections/lips" },
    { name: "Face", href: "/collections/face" },
    { name: "Eyes", href: "/collections/eyes" },
    { name: "Brushes", href: "/collections/brushes" },
    { name: "Deals", href: "/collections/deals" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-gray-100">
      <AnnouncementBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className="text-gray-900 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
            <Link href="/" className="text-2xl font-bold tracking-widest text-black uppercase">
              Miss Rose
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-900 hover:text-sale transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-900 p-2 hidden sm:block hover:text-gray-600 transition-colors">
              <Search size={22} />
            </button>
            <Link href="/login" className="text-gray-900 p-2 hidden sm:block hover:text-gray-600 transition-colors">
              <User size={22} />
            </Link>
            <Link href="/cart" className="text-gray-900 p-2 relative hover:text-gray-600 transition-colors">
              <ShoppingBag size={22} />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-sale text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex space-x-4 px-3 py-4 border-t border-gray-100">
              <button className="text-gray-900 flex items-center gap-2">
                <Search size={20} /> Search
              </button>
              <Link href="/login" className="text-gray-900 flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <User size={20} /> Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
