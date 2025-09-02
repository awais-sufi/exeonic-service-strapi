"use client";

import { useEffect, useState } from "react";
import { WhyUs } from "./types";

const API_URL =
  "http://localhost:1337/api/solution?populate[solution][populate]=image";

export default function WhyUsSection() {
  const [data, setData] = useState<WhyUs | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();

        if (!json.data) {
          setError("No data found. Did you publish the single type in Strapi?");
          return;
        }

        const mapped: WhyUs = {
          id: json.data.id,
          heading: json.data.heading,
          subHeading: json.data.subHeading,
          solution: json.data.solution ?? [],
        };

        setData(mapped);
      } catch (err) {
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
        <h2 className="text-sm sm:text-base font-semibold inline-block border-1 border-[#219ebc] rounded-full text-[#219ebc] py-1.5 px-4 sm:py-2 sm:px-5 mb-3 sm:mb-4">
          {data.heading}
        </h2>
        <p className="text-base sm:text-4xl font-bold">{data.subHeading}</p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-6 sm:gap-8">
        {data.solution.map((item, index) => {
          // default span for desktop
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
              {/* Heading + subheading */}
              <h3 className="text-lg sm:text-xl font-bold mb-3">
                {item.heading}
              </h3>
              <p className="mb-6 text-sm sm:text-lg font-normal">
                {item.subHeading}
              </p>

              {/* Big image */}
              {item.image && (
                <div className="w-full flex justify-center sm:justify-end">
                  <img
                    src={`http://localhost:1337${
                      item.image?.formats?.large?.url ||
                      item.image?.formats?.medium?.url ||
                      item.image?.url
                    }`}
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
