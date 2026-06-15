import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import { Footer } from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { ModalProvider } from "@/providers/modal-provider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RelaxMap",
  description: "RelaxMap frontend application",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <QueryProvider>
          <header>
            <Header />
          </header>
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
          <ModalProvider />
          {modal}
          <Toaster position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
