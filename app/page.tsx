import BuiltForEveryone from "@/components/sections/BuiltForEveryone";
import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyUs from "@/components/sections/WhyUs";

export default function Home() {
  return (
    <main className="container mx-auto">
      <Hero />
      <HowItWorks />
      <WhyUs />
      <BuiltForEveryone />
      <Faq />
    </main>
  );
}