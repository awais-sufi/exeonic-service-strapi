// components/Provide.tsx
import { ProvideItem } from "./types";
import Image from "next/image";

interface ProvideProps {
  heading: string;
  subHeading: string;
  provide: ProvideItem[];
}

export default function Provide({
  heading,
  subHeading,
  provide,
}: ProvideProps) {
  if (!provide || provide.length === 0) return null;

  return (
    <section className="px-6 py-12 max-w-6xl mx-auto">
      <div className="text-center">
        <h2 className="text-sm sm:text-base font-semibold inline-block border-1 border-[#219ebc] rounded-full text-[#219ebc] py-1.5 px-4 sm:py-2 sm:px-5 mb-3 sm:mb-4">
          {heading}
        </h2>
        <p className="text-base sm:text-4xl font-bold mb-10">{subHeading}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {provide.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl cursor-pointer flex flex-col border-1  border-transparent hover:border-[#219ebc] transition"
          >
            {/* Logo Image */}
            {item.logo?.data?.attributes?.url && (
              <Image
                src={`http://localhost:1337${item.logo.data.attributes.url}`}
                alt={item.logo.data.attributes.alternativeText ?? item.heading}
                width={80}
                height={80}
                className="mb-4 rounded-md object-contain"
              />
            )}

            <h3 className="text-xl font-bold mb-2">{item.heading}</h3>
            <p className="text-[#7c707f] font-medium leading-5 whitespace-pre-line">
              {item.paragraph}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
