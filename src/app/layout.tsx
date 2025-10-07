import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import * as Constants from "@/constants/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const shipporiMincho = localFont({
  src: [
    {
      path: "../../public/fonts/Shippori_Mincho/ShipporiMincho-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Shippori_Mincho/ShipporiMincho-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Shippori_Mincho/ShipporiMincho-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Shippori_Mincho/ShipporiMincho-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Shippori_Mincho/ShipporiMincho-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-shippori-mincho",
});

const shipporiAntiqua = localFont({
  src: [
    {
      path: "../../public/fonts/Shippori_Antique_B1/ShipporiAntiqueB1-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-shippori-antiqua",
});

export const metadata: Metadata = {
  title: Constants.GroupName,
  description: "Personal portfolio website showcasing projects and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${shipporiAntiqua.variable} ${shipporiMincho.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
