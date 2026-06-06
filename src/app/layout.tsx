import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RelaxMap',
  description: 'RelaxMap FrontEnd Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
