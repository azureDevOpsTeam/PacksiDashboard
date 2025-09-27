'use client';

import React from 'react';
import { Bell, Search, Settings, User } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 font-persian">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder={t('header.search')}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rtl:pr-10 rtl:pl-4"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Language Toggle */}
          <LanguageToggle />

          {/* Notifications */}
          <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <button className="flex items-center space-x-2 rtl:space-x-reverse p-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium">{t('header.profile')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;