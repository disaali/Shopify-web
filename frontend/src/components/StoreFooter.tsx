"use client";

import Link from "next/link";

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
    </svg>
  );
}

function TwitterIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  );
}

function YoutubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
    </svg>
  );
}

export default function StoreFooter() {
  return (
    <footer className="bg-[#121212] text-white pt-16 pb-8 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-bold uppercase tracking-widest mb-6">Miss Rose</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Miss Rose offers high-quality cosmetics and makeup products at affordable prices. Shop our wide range of lipsticks, foundations, palettes, and more.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <YoutubeIcon size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/collections" className="text-gray-400 hover:text-white text-sm transition-colors">Shop All</Link></li>
              <li><Link href="/collections/lips" className="text-gray-400 hover:text-white text-sm transition-colors">Lips</Link></li>
              <li><Link href="/collections/face" className="text-gray-400 hover:text-white text-sm transition-colors">Face</Link></li>
              <li><Link href="/collections/eyes" className="text-gray-400 hover:text-white text-sm transition-colors">Eyes</Link></li>
              <li><Link href="/collections/deals" className="text-gray-400 hover:text-white text-sm transition-colors">Special Deals</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white text-sm transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white text-sm transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">FAQs</Link></li>
              <li><Link href="/track-order" className="text-gray-400 hover:text-white text-sm transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border border-gray-700 px-4 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-white text-black font-semibold py-2 px-4 text-sm hover:bg-gray-200 transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Miss Rose Official. All Rights Reserved.
          </p>
          <div className="flex space-x-2">
            {/* Simple text placeholders for payment methods */}
            <span className="bg-gray-800 text-[10px] px-2 py-1 rounded text-gray-400 font-bold">VISA</span>
            <span className="bg-gray-800 text-[10px] px-2 py-1 rounded text-gray-400 font-bold">MASTERCARD</span>
            <span className="bg-gray-800 text-[10px] px-2 py-1 rounded text-gray-400 font-bold">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
