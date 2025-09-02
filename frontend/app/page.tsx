import { fetchAPI } from "@/lib/api";
import ServiceSection from "@/components/hero/hero";
import ProvideSection from "@/components/Provide/Provide";
import { Service } from "@/components/hero/types";
import { ProvideResponse } from "@/components/Provide/types";
import WhyUsSection from "@/components/solution/Solution";
import Faq from "@/components/faq/Faq";
import Partner from "@/components/partner/Partner";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export default async function HomePage() {
  // Fetch both in parallel for better performance
  const [serviceRes, provideRes] = await Promise.all([
    fetchAPI<{ data: Service }>("/api/service?populate=*"),
    fetchAPI<ProvideResponse>("/api/provide?populate=*"),
  ]);

  const serviceSection = serviceRes.data;
  const provideSection = provideRes.data;

  return (
    <>
      <Header />
      <main className="space-y-16">
        {/* Hero / Service Section */}
        {serviceSection && <ServiceSection section={serviceSection} />}

        {/* Provide Section */}
        {provideSection?.provide?.length > 0 && (
          <ProvideSection
            heading={provideSection.heading}
            subHeading={provideSection.subHeading}
            provide={provideSection.provide}
          />
        )}
        <WhyUsSection />
        <Faq />
        <Partner />
        <Footer />
      </main>
    </>
  );
}
