// components/hero/Hero.tsx
import { Service } from "./types";
import { fetchAPI } from "@/lib/api";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

interface ServiceSectionProps {
  section: Service;
}

function ServiceSection({ section }: ServiceSectionProps) {
  // Handle full or relative URL from Strapi
  const bgUrl =
    section.background.formats?.large?.url || section.background.url;
  const imageUrl = bgUrl.startsWith("http") ? bgUrl : `${STRAPI_URL}${bgUrl}`;

  return (
    <section
      className="relative w-full h-[300px] flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h2 className="text-3xl md:text-5xl text-black font-semibold">
          {section.label}
        </h2>
      </div>
    </section>
  );
}

// Main Hero component
export default async function Hero() {
  try {
    const serviceRes = await fetchAPI<{ data: Service }>(
      "/api/service?populate=*"
    );
    const serviceSection = serviceRes.data;

    if (!serviceSection) return null;

    return <ServiceSection section={serviceSection} />;
  } catch (error) {
    console.error("Error fetching Hero section:", error);
    return null;
  }
}
