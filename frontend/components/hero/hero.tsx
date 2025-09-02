import { Service } from "./types";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function ServiceSection({ section }: { section: Service }) {
  return (
    <section
      className="relative w-full h-[300px] flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${STRAPI_URL}${
          section.background.formats?.large?.url || section.background.url
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h2 className="text-3xl md:text-5xl text-black font-semibold">
          {section.label}
        </h2>
      </div>
    </section>
  );
}
