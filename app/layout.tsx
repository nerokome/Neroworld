import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Nero Oghenekome - Portfolio",
  description: "Nero Oghenekome's personal portfolio website showcasing projects, skills, and experience.",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
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
        data-theme="dark"
        className={`${lato.variable} antialiased`}

      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
