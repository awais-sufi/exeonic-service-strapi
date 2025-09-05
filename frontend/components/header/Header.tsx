"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HeaderData, ApiResponse } from "./types";
import { Menu, X } from "lucide-react";
import { fetchAPI } from "@/lib/api"; // ✅ import helper

export default function Header() {
  const [header, setHeader] = useState<HeaderData | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const data: ApiResponse = await fetchAPI<ApiResponse>(
          "/api/header?populate[header][populate][0]=logo&populate[header][populate][1]=link&populate[header][populate][2]=button"
        );

        if (data.data.header.length > 0) {
          setHeader(data.data.header[0]);
        }
      } catch (error) {
        console.error("Error fetching header:", error);
      }
    };

    fetchHeader();
  }, []);

  if (!header) return <p className="text-center mt-10">Loading...</p>;

  return (
    <header className="w-full py-4">
      <div className="max-w-7xl mx-auto px-12  flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <Image
            src={
              header.logo.url.startsWith("http")
                ? header.logo.url // already absolute
                : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${header.logo.url}` // relative URL, prepend API
            }
            alt={header.logo.alternativeText || "Logo"}
            width={100}
            height={30}
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav + Buttons */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-8">
            {header.link.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="relative text-black font-semibold text-xl transition-colors duration-300 
                 hover:text-[#219ebc] 
                 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#219ebc] 
                 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.text}
              </Link>
            ))}
          </nav>
          <div className="flex space-x-3">
            {header.button.map((btn) => (
              <Link
                key={btn.id}
                href={btn.url}
                className="px-4 py-2 text-lg rounded-lg shadow-sm bg-[#219ebc] text-white  transition"
              >
                {btn.text}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-700"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-8 py-4 space-y-4">
          <nav className="flex flex-col space-y-3">
            {header.link.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="text-gray-700 hover:text-[#219ebc] transition-colors"
              >
                {item.text}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col space-y-3 pt-4 border-t">
            {header.button.map((btn) => (
              <Link
                key={btn.id}
                href={btn.url}
                className="px-4 py-2 rounded-2xl shadow-sm bg-[#219ebc] text-white  transition text-center"
              >
                {btn.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
