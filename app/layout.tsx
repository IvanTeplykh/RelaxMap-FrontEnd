import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import { Footer } from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { ModalProvider } from "@/providers/modal-provider";

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
        <main>
          <header>
            <Header />
          </header>
          {children}
          <Toaster position="top-center" />
          <ModalProvider />
          <Footer />
        </main>
      </body>
    </html>
  );
}
