import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "modern-normalize";
import "./globals.css";

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
        <main>{children}</main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
