import Image from "next/image";
import Link from "next/link";
import { fetchAPI } from "@/lib/api";
import { FaqResponse } from "./types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // shadcn/ui accordion

export async function getFaqData(): Promise<FaqResponse["data"]> {
  const isProd = process.env.NODE_ENV === "production";

  // ✅ Use different populate strategies depending on environment
  const query = isProd
    ? "/api/faq?populate[question]=*&populate[image]=*&populate[button]=*"
    : "/api/faq?populate=*";

  const res = await fetchAPI<FaqResponse>(query);

  if (!res?.data) {
    throw new Error("Failed to fetch FAQ data from Strapi");
  }

  return res.data;
}

export default async function Faq() {
  const faq = await getFaqData();

  return (
    <section className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid gap-12 md:grid-cols-[60%_40%]">
      {/* Left Column: Heading + Accordion */}
      <div>
        <h2 className="text-sm sm:text-base inline-block border-1 border-[#219ebc] rounded-full text-[#219ebc] py-1.5 px-4 sm:py-2 sm:px-5 mb-3 sm:mb-4">
          {faq.faq}
        </h2>

        <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3">
          {faq.heading}
        </h2>
        <p className="text-base sm:text-md font-medium text-[#5d6b7f] mb-6">
          {faq.subHeading}
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faq.question.map((q) => (
            <AccordionItem key={q.id} value={`q-${q.id}`}>
              <AccordionTrigger className="accordion-trigger text-left text-base sm:text-lg font-medium">
                {q.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-sm sm:text-base">
                {q.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Right Column: Image + Text + Button */}
      <div className="bg-blue-50 p-4 sm:p-6 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center">
        {faq.image?.url && (
          <div className="flex justify-center mb-3 sm:mb-4">
            <Image
              src={faq.image.url}
              alt={faq.image.alternativeText ?? "FAQ image"}
              width={120}
              height={120}
              className="rounded-md object-contain"
            />
          </div>
        )}

        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
          {faq.text}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-4">{faq.subtext}</p>

        {faq.button && faq.button.url && (
          <Link
            href={faq.button.url}
            className="inline-flex font-bold items-center gap-2 bg-[#219ebc] hover:bg-[#1b7a99] text-white px-5 sm:px-6 py-2 sm:py-3 rounded-full shadow transition"
          >
            <span>📞</span> {faq.button.label}
          </Link>
        )}
      </div>
    </section>
  );
}
