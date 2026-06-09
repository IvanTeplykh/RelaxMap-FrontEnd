import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "modern-normalize";
import "./globals.css";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "RelaxMap",
  description: "RelaxMap frontend application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Header />
        </header>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
