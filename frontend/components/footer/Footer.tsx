"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FooterData, ApiResponse } from "./types";
import { fetchAPI } from "@/lib/api"; // 👈 adjust path if your fetchAPI is in lib/api.ts

export default function Footer() {
  const [footer, setFooter] = useState<FooterData | null>(null);

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const data: ApiResponse = await fetchAPI<ApiResponse>(
          "/api/footer?populate=*"
        );
        console.log("API Response:", data);

        if (data.data) {
          setFooter(data.data); // ✅ matches corrected types
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

  return (
    <footer className="bg-[#102e3c] text-white py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Paragraph */}
        <div>
          <Image
            src={`${
              process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
            }${footer.logo.url}`}
            alt={footer.logo.alternativeText || "Logo"}
            width={58}
            height={58}
            className="mb-4 rounded-xl"
          />
          <p className="text-white font-semibold text-lg leading-relaxed mb-4">
            {footer.paragraph}
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            {footer.socaillink?.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white border border-gray-300 rounded-full p-2"
              >
                <i
                  className={
                    typeof item.icon === "string"
                      ? item.icon
                      : item.icon?.url || ""
                  }
                ></i>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:text-center">
          <h3 className="font-semibold  text-lg my-10">{footer.heading}</h3>
          <ul className="space-y-6">
            {footer.link.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  className="text-white  font-semibold text-md hover:text-[#219ebc] "
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Others */}
        <div>
          <h3 className="font-semibold text-lg my-10">{footer.heading1}</h3>
          <ul className="space-y-6">
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
          <h3 className="font-semibold text-lg mt-10 mb-5">
            {footer.heading2}
          </h3>
          <p className="text-white text-md font-semibold mb-4">
            {footer.subHeading}
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 w-full rounded-l bg-white text-gray-800 text-sm outline-none"
            />
            <Link
              href={footer.button.url}
              className="bg-gray-400 text-white px-4 py-2 rounded-r hover:bg-[#219ebc] text-sm"
            >
              {footer.button.text}
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-white text-md font-semibold border-t border-gray-700 pt-6 max-w-6xl mx-auto">
        {footer.lasttext}
      </div>
    </footer>
  );
}
