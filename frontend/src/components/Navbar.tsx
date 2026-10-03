"use client";
import Link from "next/link";
import { ShoppingCart, User, Package, MessageSquare } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="font-bold text-xl text-gray-900">PriceOye</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/chat" className="text-gray-600 hover:text-blue-600 flex items-center gap-1 font-medium">
              <MessageSquare className="w-5 h-5" />
              <span>AI Assistant</span>
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-blue-600">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/orders" className="text-gray-600 hover:text-blue-600">
                  <Package className="w-6 h-6" />
                </Link>
                <button onClick={logout} className="text-sm font-medium text-gray-600 hover:text-red-600">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-blue-600 flex items-center gap-1 font-medium">
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
