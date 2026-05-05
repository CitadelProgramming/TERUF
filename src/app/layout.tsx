// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'TERUF - Elizabeth Resources Universal Foundation',
  description: 'Holistic sexual and reproductive health education, free counseling, and advocacy in Nigeria.',
  icons: {
    icon: '/TERUF LOGO.png', // Add later
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-50 text-neutral-900">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}