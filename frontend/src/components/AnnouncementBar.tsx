"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-black text-white text-xs sm:text-sm font-medium py-2 px-4 relative flex justify-center items-center">
      <p className="text-center tracking-wide">
        FREE DELIVERY ON ORDERS ABOVE Rs.2000 | COD AVAILABLE NATIONWIDE
      </p>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Close announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
}
