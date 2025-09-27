'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

// Inner layout component that can use the language context
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const isRTL = language === 'fa';

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 flex font-persian ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-0">
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </LanguageProvider>
      </body>
    </html>
  );
}
