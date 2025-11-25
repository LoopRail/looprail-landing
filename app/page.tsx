'use client'
import BuiltForEveryone from "@/components/sections/BuiltForEveryone";
import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyUs from "@/components/sections/WhyUs";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Refresh AOS animations when component mounts
    const refreshAOS = () => {
      if (typeof window !== 'undefined') {
        // @ts-expect-error: AOS is loaded via script tag and not in TypeScript types
        if (window.AOS) {
          // @ts-expect-error: AOS is loaded via script tag and not in TypeScript types
          window.AOS.refresh();
        }
      }
    };
    
    // Refresh immediately
    refreshAOS();
    
    // Refresh again after a short delay to ensure all elements are rendered
    const timeoutId = setTimeout(refreshAOS, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="container mx-auto" data-aos-easing="ease-out-cubic">
      <Hero />
      <HowItWorks />
      <WhyUs />
      <BuiltForEveryone />
      <Faq />
    </main>
  );
}