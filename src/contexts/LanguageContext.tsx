'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fa';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Header
    'header.dashboard': 'Dashboard',
    'header.welcome': 'Welcome back to your admin panel',
    'header.notifications': 'Notifications',
    'header.profile': 'Admin User',
    'header.email': 'admin@packsi.com',
    'header.search': 'Search...',

    // Sidebar
    'sidebar.home': 'Home',
    'sidebar.requests': 'Requests',
    'sidebar.parcels': 'Parcels',
    'sidebar.chat': 'Chat',
    'sidebar.settings': 'Settings',
    'sidebar.adminPanel': 'Admin Panel',
    'sidebar.userManagement': 'User Management',
    'sidebar.userManagement.desc': 'View and manage users',
    'sidebar.advertisement': 'Advertisement',
    'sidebar.advertisement.desc': 'View and manage advertisements',
    'sidebar.reports': 'Reports',
    'sidebar.reports.desc': 'View system reports',
    'sidebar.sendTicker': 'Send Ticker',
    'sidebar.sendTicker.desc': 'Send new ticker',
    'sidebar.sendedParcel': 'Sended Parcel',
    'sidebar.sendedParcel.desc': 'View sent parcels',

    // Dashboard Stats
    'stats.totalUsers': 'Total Users',
    'stats.activeUsers': 'Active Users',
    'stats.totalPackages': 'Total Packages',
    'stats.packagesInTransit': 'Packages In Transit',
    'stats.usdBalance': 'USD Balance',
    'stats.usDollar': 'US Dollar',
    'stats.irrBalance': 'IRR Balance',
    'stats.iranianRial': 'Iranian Rial',

    // Services
    'services.title': 'Services',
    'services.createRequest': '+ Create New Request',
    'services.parcelList': 'Parcel List',
    'services.parcelList.desc': 'Select your desired flight from the list',
    'services.roomRental': 'Temporary Room Rental',
    'services.roomRental.desc': 'Find the best affordable and best room you like',
    'services.carRental': 'Car Rental',
    'services.carRental.desc': 'Find the best reliable and affordable car for your trip',
    'services.personalServices': 'Personal Services',
    'services.personalServices.desc': 'Other trusted people who want to provide services for you',
    'services.status.active': 'Active',
    'services.status.soon': 'Soon',

    // Quick Actions
    'quickActions.title': 'Quick Actions',
    'quickActions.viewReports': 'View Reports',
    'quickActions.addUser': 'Add User',
    'quickActions.sendNotice': 'Send Notice',
    'quickActions.settings': 'Settings',

    // Footer
    'footer.copyright': '© 2024 Packsi Dashboard. All rights reserved.',
    'footer.version': 'Version 1.0.0',
    'footer.support': 'Support',

    // Language
    'language.english': 'English',
    'language.persian': 'فارسی',

    // Landing
    'landing.title': 'Passenger-powered shipping, fast and secure',
    'landing.subtitle': 'Match with trusted travelers, track flights live, and deliver globally with confidence.',
    'landing.hero.tag': 'Peer-to-peer shipping platform',
    'landing.cta.request': 'Request a shipment',
    'landing.cta.carrier': "I'm a traveler",
    'landing.flightStatusTitle': 'Registered flights status',
    'landing.howItWorks': 'How it works',
    'landing.hero.metrics.parcels': 'Parcels sent',
    'landing.hero.metrics.flights': 'Active flights',

    // Flight statuses
    'flight.status.registered': 'Registered',
    'flight.status.pickedUp': 'Picked up',
    'flight.status.atAirport': 'At airport',
    'flight.status.inFlight': 'In flight',
    'flight.status.arrived': 'Arrived',
    'flight.status.delivered': 'Delivered',
  },
  fa: {
    // Header
    'header.dashboard': 'داشبورد',
    'header.welcome': 'به پنل مدیریت خود خوش آمدید',
    'header.notifications': 'اعلان‌ها',
    'header.profile': 'کاربر مدیر',
    'header.email': 'admin@packsi.com',
    'header.search': 'جستجو...',

    // Sidebar
    'sidebar.home': 'خانه',
    'sidebar.requests': 'درخواست‌ها',
    'sidebar.parcels': 'بسته‌ها',
    'sidebar.chat': 'چت',
    'sidebar.settings': 'تنظیمات',
    'sidebar.adminPanel': 'پنل مدیریت',
    'sidebar.userManagement': 'مدیریت کاربران',
    'sidebar.userManagement.desc': 'مشاهده و مدیریت کاربران',
    'sidebar.advertisement': 'تبلیغات',
    'sidebar.advertisement.desc': 'مشاهده و مدیریت تبلیغات',
    'sidebar.reports': 'گزارش‌ها',
    'sidebar.reports.desc': 'مشاهده گزارش‌های سیستم',
    'sidebar.sendTicker': 'ارسال تیکر',
    'sidebar.sendTicker.desc': 'ارسال تیکر جدید',
    'sidebar.sendedParcel': 'بسته‌های ارسالی',
    'sidebar.sendedParcel.desc': 'مشاهده بسته‌های ارسال شده',

    // Dashboard Stats
    'stats.totalUsers': 'کل کاربران',
    'stats.activeUsers': 'کاربران فعال',
    'stats.totalPackages': 'کل بسته‌ها',
    'stats.packagesInTransit': 'بسته‌های در حال ترانزیت',
    'stats.usdBalance': 'موجودی دلار',
    'stats.usDollar': 'دلار آمریکا',
    'stats.irrBalance': 'موجودی ریال',
    'stats.iranianRial': 'ریال ایران',

    // Services
    'services.title': 'خدمات',
    'services.createRequest': '+ ایجاد درخواست جدید',
    'services.parcelList': 'لیست بسته‌ها',
    'services.parcelList.desc': 'پرواز مورد نظر خود را از لیست انتخاب کنید',
    'services.roomRental': 'اجاره اتاق موقت',
    'services.roomRental.desc': 'بهترین اتاق مقرون به صرفه و مناسب را پیدا کنید',
    'services.carRental': 'اجاره خودرو',
    'services.carRental.desc': 'بهترین خودروی قابل اعتماد و مقرون به صرفه را برای سفر خود پیدا کنید',
    'services.personalServices': 'خدمات شخصی',
    'services.personalServices.desc': 'افراد قابل اعتماد دیگری که می‌خواهند خدماتی برای شما ارائه دهند',
    'services.status.active': 'فعال',
    'services.status.soon': 'به زودی',

    // Quick Actions
    'quickActions.title': 'اقدامات سریع',
    'quickActions.viewReports': 'مشاهده گزارش‌ها',
    'quickActions.addUser': 'افزودن کاربر',
    'quickActions.sendNotice': 'ارسال اطلاعیه',
    'quickActions.settings': 'تنظیمات',

    // Footer
    'footer.copyright': '© ۱۴۰۳ داشبورد پکسی. تمامی حقوق محفوظ است.',
    'footer.version': 'نسخه ۱.۰.۰',
    'footer.support': 'پشتیبانی',

    // Language
    'language.english': 'English',
    'language.persian': 'فارسی',

    // Landing
    'landing.title': 'حمل توسط مسافر، سریع و امن',
    'landing.subtitle': 'با مسافران مورد اعتماد مچ شوید، پروازها را زنده ببینید و با اطمینان جهانی ارسال کنید.',
    'landing.hero.tag': 'پلتفرم حمل توسط مسافر',
    'landing.cta.request': 'ثبت درخواست حمل',
    'landing.cta.carrier': 'مسافر هستم',
    'landing.flightStatusTitle': 'وضعیت پروازهای ثبت‌شده',
    'landing.howItWorks': 'چطور کار می‌کند',
    'landing.hero.metrics.parcels': 'بسته ارسال‌شده',
    'landing.hero.metrics.flights': 'پرواز فعال',

    // Flight statuses
    'flight.status.registered': 'ثبت‌شده',
    'flight.status.pickedUp': 'تحویل از فرستنده',
    'flight.status.atAirport': 'در فرودگاه',
    'flight.status.inFlight': 'در پرواز',
    'flight.status.arrived': 'ورود به مقصد',
    'flight.status.delivered': 'تحویل نهایی',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fa')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem('language', language);
    
    // Update document direction and language
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const isRTL = language === 'fa';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};