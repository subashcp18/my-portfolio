import type { Metadata } from "next";
import { Archivo, Geist } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Subash — Software Developer",
  description:
    "Software Engineer and Framer creator based in Syria, currently working on Templyo. Building modern, scalable, and conversion-driven web experiences.",
  keywords: [
    "Majd",
    "Software Engineer",
    "Framer Creator",
    "Frontend Developer",
    "Templyo",
    "Framer Templates",
    "Portfolio",
  ],
  authors: [{ name: "Subash" }],
  openGraph: {
    title: "Subash — Software Developer",
    description:
      "Software Engineer and Framer creator building modern, scalable, and conversion-driven web experiences.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="font-sans antialiased bg-[#f4f3f0] text-[#0f0f0f] selection:bg-[#0f0f0f] selection:text-[#f4f3f0]">
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen relative">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
