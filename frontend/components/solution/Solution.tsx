"use client";

import { useEffect, useState } from "react";
import { WhyUs } from "./types";
import { fetchAPI } from "@/lib/api";
import Image from "next/image";

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

// Strapi responses are usually wrapped like { data: ... }
interface WhyUsResponse {
  data: WhyUs;
}

export default function WhyUsSection() {
  const [data, setData] = useState<WhyUs | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const json = await fetchAPI<WhyUsResponse>(
          "/api/solution?populate[solution][populate]=image"
        );

        if (!json.data) {
          setError("No data found. Did you publish the single type in Strapi?");
          return;
        }

        setData(json.data);
      } catch {
        setError("Failed to fetch data");
      }
    }

    fetchData();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <section className="p-6 sm:p-8 space-y-12 max-w-6xl mx-auto">
      {/* Section heading */}
      <div className="text-center">
        <h2
          className="text-sm sm:text-base font-semibold inline-block 
             border border-[#219ebc] rounded-full text-[#219ebc] 
             py-1.5 px-4 sm:py-2 sm:px-5 mb-3 sm:mb-4 
             hover:bg-[#3199b3] hover:text-white"
        >
          {data.heading}
        </h2>
        <p className="text-base sm:text-4xl font-bold">{data.subHeading}</p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-6 sm:gap-8">
        {data.solution.map((item, index) => {
          let spanClass = "lg:col-span-5";
          if (index === 0) spanClass = "lg:col-span-4";
          if (index === 1) spanClass = "lg:col-span-6";
          if (index === 2) spanClass = "lg:col-span-6";
          if (index === 3) spanClass = "lg:col-span-4";

          return (
            <div
              key={item.id}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col bg-[#f7fafc] ${spanClass}`}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3">
                {item.heading}
              </h3>
              <p className="mb-6 text-sm sm:text-lg font-normal">
                {item.subHeading}
              </p>

              {item.image && (
                <div className="w-full flex justify-center sm:justify-end">
                  <Image
                    src={
                      (
                        item.image?.formats?.large?.url ||
                        item.image?.formats?.medium?.url ||
                        item.image?.url
                      )?.startsWith("http")
                        ? item.image.formats?.large?.url ||
                          item.image.formats?.medium?.url ||
                          item.image.url // absolute URL, use as is
                        : `${API_URL}${
                            item.image?.formats?.large?.url ||
                            item.image?.formats?.medium?.url ||
                            item.image?.url
                          }` // relative URL, prepend API_URL
                    }
                    width={500}
                    height={500}
                    alt={item.image?.alternativeText || item.heading}
                    className="rounded-xl object-contain max-h-48 sm:max-h-60"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
