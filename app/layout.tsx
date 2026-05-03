import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const libre = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fallow Coffee",
    template: "%s | Fallow Coffee",
  },
  description:
    "Neighbourhood coffee, roasted with intention. Visit us, pre-order your morning, or explore the seasonal menu.",
  openGraph: {
    type: "website",
    siteName: "Fallow Coffee",
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
      className={`${playfair.variable} ${dmSans.variable} ${libre.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-milk text-espresso antialiased">
        {children}
      </body>
    </html>
  );
}
