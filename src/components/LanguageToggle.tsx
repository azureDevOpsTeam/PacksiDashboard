'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'fa' as const, name: 'فارسی', flag: '🇮🇷' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative font-persian">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium">{currentLanguage?.name}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-20">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 text-left rtl:text-right hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  language === lang.code 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {language === lang.code && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageToggle;