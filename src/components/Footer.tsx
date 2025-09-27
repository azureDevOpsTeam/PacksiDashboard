'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-6 py-4 font-persian">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {t('footer.copyright')}
        </div>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
            {t('footer.support')}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;