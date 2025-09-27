'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

// App shell that adapts per-route (landing has no dashboard chrome)
function AppShell({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const pathname = usePathname();
  const isRTL = language === 'fa';
  const isLanding = pathname?.startsWith('/landing');

  if (isLanding) {
    return (
      <div className={`min-h-screen font-persian ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 flex font-persian ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 md:ml-0">
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
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
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
