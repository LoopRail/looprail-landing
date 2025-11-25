import type { Metadata } from "next";
import { Fustat, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";



const fustat = Fustat({
  variable: '--font-fustat',
  subsets: ["latin"]
})

const dm_sans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['500', '600']
})

export const metadata: Metadata = {
  title: "Looprail - Stablecoin Wallet for Africa's Connected Diaspora",
  description: "Send and receive money in 40+ countries with Looprail. The stablecoin wallet that lets you send and spend digital dollars like local cash, whether you're abroad, traveling, or supporting family back home.",
  keywords: "stablecoin, wallet, africa, diaspora, remittance, money transfer, digital dollars, cryptocurrency, fintech",
  authors: [{ name: "Looprail Team" }],
  creator: "Looprail",
  publisher: "Looprail",
  robots: "index, follow",
  openGraph: {
    title: "Looprail - Stablecoin Wallet for Africa's Connected Diaspora",
    description: "Send and receive money in 40+ countries with Looprail. The stablecoin wallet that lets you send and spend digital dollars like local cash.",
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
        className={`${fustat.variable} ${dm_sans.variable} ${fustat.variable} antialiased container mx-auto font-fustat`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
