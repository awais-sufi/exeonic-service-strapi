"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FooterData, ApiResponse } from "./types";
import { fetchAPI } from "@/lib/api";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const [footer, setFooter] = useState<FooterData | null>(null);

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const data: ApiResponse = await fetchAPI<ApiResponse>(
          "/api/footer?populate=*"
        );
        if (data.data) {
          setFooter(data.data);
        } else {
          console.warn("No footer data found");
        }
      } catch (err) {
        console.error("Footer fetch error:", err);
      }
    };

    loadFooter();
  }, []);

  if (!footer) return <p className="text-center mt-10">Loading footer...</p>;

  const iconMap: Record<string, React.ReactNode> = {
    facebook: <FaFacebook size={18} />,
    linkedin: <FaLinkedin size={18} />,
  };

  return (
    <footer className="bg-[#102e3c] text-white py-20">
      {/* ✅ Mobile padding only */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-0">
        {/* Logo & Paragraph */}
        <div>
          <Image
            src={
              footer.logo.url.startsWith("http")
                ? footer.logo.url
                : `${
                    process.env.NEXT_PUBLIC_STRAPI_API_URL ||
                    "http://localhost:1337"
                  }${footer.logo.url}`
            }
            alt={footer.logo.alternativeText || "Logo"}
            width={58}
            height={58}
            className="mb-4 rounded-xl"
          />

          <p className="text-white font-semibold text-lg leading-relaxed mb-4">
            {footer.paragraph}
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 flex-wrap">
            {footer.socaillink?.map((item) => {
              const key = item.logoText?.trim().toLowerCase() || "";
              return (
                <Link
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white border border-white rounded-full p-2 inline-flex items-center justify-center"
                >
                  {iconMap[key] || <span>{item.logoText}</span>}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold md:text-center text-lg my-6 md:my-10">
            {footer.heading}
          </h3>
          <ul className="space-y-4 md:text-center md:space-y-6">
            {footer.link.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  className="text-white font-semibold text-md hover:text-[#219ebc]"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Others */}
        <div>
          <h3 className="font-semibold text-lg my-6 md:my-10">
            {footer.heading1}
          </h3>
          <ul className="space-y-4 md:space-y-6">
            {footer.link1.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  className="text-white font-semibold text-md hover:text-[#219ebc]"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mt-6 md:mt-10 mb-4 md:mb-5">
            {footer.heading2}
          </h3>
          <p className="text-white text-md font-semibold mb-4">
            {footer.subHeading}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-stretch gap-3 sm:gap-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 w-full rounded sm:rounded-l bg-white text-gray-800 text-sm outline-none"
            />
            <Link
              href={footer.button.url}
              className="bg-gray-400 text-white px-6 py-2 rounded sm:rounded-r hover:bg-[#219ebc] text-sm w-full sm:w-auto text-center"
            >
              {footer.button.text}
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 text-start text-white text-md font-semibold border-t border-gray-700 pt-6 max-w-6xl mx-auto px-6 md:px-0">
        {footer.lasttext}
      </div>
    </footer>
  );
}
