"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              BitZipp
            </div>
            <div className="text-xs text-gray-400 hidden sm:block">
              Share • Store • Simplify
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-1">
            <Link href="/">
              <div className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/") 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}>
                🔗 URLs
              </div>
            </Link>
            <Link href="/data">
              <div className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/data") 
                  ? "bg-green-600 text-white shadow-lg" 
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}>
                📝 Data
              </div>
            </Link>
            <Link href="/file">
              <div className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/file") 
                  ? "bg-purple-600 text-white shadow-lg" 
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}>
                📁 Files
              </div>
            </Link>
            <Link href="/contact">
              <div className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/contact") 
                  ? "bg-gray-600 text-white shadow-lg" 
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}>
                💬 Contact
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
