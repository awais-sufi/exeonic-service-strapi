// app/page.tsx
import Provide from "@/components/Provide/Provide";
import WhyUsSection from "@/components/solution/Solution";
import Faq from "@/components/faq/Faq";
import Partner from "@/components/partner/Partner";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/hero";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="space-y-16">
        <Hero />
        <Provide />
        <WhyUsSection />
        <Faq />
        <Partner />
        <Footer />
      </main>
    </>
  );
}
