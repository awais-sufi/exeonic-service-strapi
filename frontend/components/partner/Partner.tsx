import Image from "next/image";
import Link from "next/link";
import { PartnerResponse } from "./types";
import { fetchAPI } from "@/lib/api"; // ✅ centralized API helper

async function getPartnerData(): Promise<PartnerResponse["data"]> {
  const data: PartnerResponse = await fetchAPI<PartnerResponse>(
    "/api/partner?populate=*"
  );
  return data.data;
}

export default async function Partner() {
  const partner = await getPartnerData();

  return (
    <section>
      {/* Container to add margin around the bg-color */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#219ebc] rounded-3xl p-6 sm:p-22 grid gap-8 md:grid-cols-2 items-center">
          {/* Left column - Text */}
          <div className="text-white order-2">
            <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">
              {partner.heading}
            </h2>
            <p className="text-2xl sm:text-3xl font-bold mb-4">
              {partner.subHeading}
            </p>
            <p className="mb-4 font-semibold whitespace-pre-line text-base sm:text-lg">
              {partner.paragraph}
            </p>

            {partner.button && partner.button.url && (
              <Link
                href={partner.button.url}
                className="inline-block text-white border border-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg transition"
              >
                {partner.button.text}
              </Link>
            )}
          </div>

          {/* Right column - Image */}
          {partner.image?.url && (
            <div className="flex justify-center order-1">
              <Image
                src={
                  partner.image.url.startsWith("http")
                    ? partner.image.url // already absolute URL
                    : `${
                        process.env.NEXT_PUBLIC_STRAPI_API_URL ||
                        "http://localhost:1337"
                      }${partner.image.url}` // relative URL
                }
                alt={partner.image.alternativeText ?? "Partner image"}
                width={450}
                height={310}
                className="rounded-xl shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
