import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Services | Ventures Engineering',
  description:
    'Structural design, testing and rehabilitation for buildings, industrial sites and infrastructure, delivered by one accountable team.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
