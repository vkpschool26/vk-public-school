import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  SCHOOL_NAME,
  SCHOOL_TAGLINE,
  SCHOOL_ADDRESS,
  SCHOOL_PHONE,
  SCHOOL_EMAIL,
} from "@/lib/data/school";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SCHOOL_NAME}`,
    default: `${SCHOOL_NAME} — ${SCHOOL_TAGLINE}`,
  },
  description: `${SCHOOL_NAME} is a quality English-medium school in Balapura, Tumakuru District, Karnataka. We offer education from Nursery to Grade 5 in a nurturing, child-friendly environment.`,
  keywords: [
    "VK Public School",
    "school Balapura",
    "school Sira Taluk",
    "Tumakuru school",
    "Karnataka school",
    "primary school Karnataka",
    "English medium school",
    "Nursery to Grade 5",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SCHOOL_NAME,
    title: `${SCHOOL_NAME} — ${SCHOOL_TAGLINE}`,
    description: `Quality English-medium education from Nursery to Grade 5 in Balapura, Tumakuru District, Karnataka.`,
  },
  metadataBase: new URL("https://vkpublicschool.org"),
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "contact:phone_number": SCHOOL_PHONE,
    "contact:email": SCHOOL_EMAIL,
    "contact:locality": "Balapura",
    "contact:region": "Karnataka",
    "contact:country": "India",
    "contact:street_address": SCHOOL_ADDRESS,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
