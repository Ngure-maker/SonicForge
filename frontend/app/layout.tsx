import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';

const sora = Sora({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SonicForge | Pro Audio Sales & Rentals',
  description: 'Professional audio equipment e-commerce and rental platform.',
  keywords: ['audio equipment', 'studio gear', 'rentals', 'mpesa'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
        <Toaster position="top-right" toastOptions={{ style: { background: '#141722', color: '#E6EAF2' } }} />
      </body>
    </html>
  );
}
