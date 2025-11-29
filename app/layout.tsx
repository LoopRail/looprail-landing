import type { Metadata } from "next";
import { Fustat, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const fustat = Fustat({
  variable: "--font-fustat",
  subsets: ["latin"],
});

const dm_sans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Looprail - Stablecoin Wallet for Africa's Connected Diaspora",
  description:
    "Send and receive money in 40+ countries with Looprail. The stablecoin wallet that lets you send and spend digital dollars like local cash, whether you're abroad, traveling, or supporting family back home.",
  keywords:
    "stablecoin, wallet, africa, diaspora, remittance, money transfer, digital dollars, cryptocurrency, fintech",
  authors: [{ name: "Looprail Team" }],
  creator: "Looprail",
  publisher: "Looprail",
  robots: "index, follow",
  openGraph: {
    title: "Looprail - Stablecoin Wallet for Africa's Connected Diaspora",
    description:
      "Send and receive money in 40+ countries with Looprail. The stablecoin wallet that lets you send and spend digital dollars like local cash.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fustat.variable} ${dm_sans.variable} antialiased container mx-auto font-fustat overflow-x-hidden`}
      >
        <Header />
        {children}
        <Footer />
        <Script
          src="https://unpkg.com/aos@next/dist/aos.js"
          strategy="beforeInteractive"
        />
        <Script id="aos-init" strategy="afterInteractive">
          {`AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: false,
            offset: 100,
            delay: 0,
            anchorPlacement: 'top-bottom'
          });

          // Refresh AOS when the page loads
          window.addEventListener('load', function() {
            AOS.refresh();
          });

          // Refresh AOS on scroll for better responsiveness
          let timeout;
          window.addEventListener('scroll', function() {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
              AOS.refresh();
            }, 100);
          });`}
        </Script>
      </body>
    </html>
  );
}
