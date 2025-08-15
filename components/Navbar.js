import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-between items-center text-white">
        <Link href="/"><li className="text-xl font-bold">BitZipp</li></Link>
        <div className="flex space-x-8">
          <Link href="/">
            <li className="hover:text-gray-300 cursor-pointer">Home</li>
          </Link>
          <Link href="/contact">
            <li className="hover:text-gray-300 cursor-pointer">Contact us</li>
          </Link>
          
        </div>
      </ul>
    </nav>
  );
}
