import type { Metadata } from "next";
import { Cormorant_Garamond, Bebas_Neue, Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  style: ["normal", "italic"],
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow-condensed",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "Valiente Premium | Haval · JMC · Shineray · Domy",
  description: "Concesionario oficial multimarca en San Juan. La nueva generación llegó.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${bebas.variable} ${barlowCondensed.variable} ${barlow.variable} font-barlow antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
