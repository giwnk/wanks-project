import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const cabinetGrotesk = localFont({
  src: "../../public/fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-cabinet",
  display: "swap",
});

const chillax = localFont({
  src: "../../public/fonts/Chillax-Variable.woff2",
  variable: "--font-chillax",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wanks Project — Personal Portfolio & Showcase",
  description:
    "Personal portfolio and showcase of Ananda Giwank Abhinaya featuring web applications, UI/UX designs, projects, and technical skills.",
  icons: {
    icon: "/logo/hand-horns-icon.svg",
    shortcut: "/logo/hand-horns-icon.svg",
    apple: "/logo/hand-horns-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        cabinetGrotesk.variable,
        chillax.variable,
        spaceMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          {children}
          <Footer/>
          <Toaster/>
        </Providers>
      </body>
    </html>
  );
}
