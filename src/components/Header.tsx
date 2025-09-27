'use client';

import React from 'react';
import { Bell, Search, Settings, User } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-3 font-persian shadow-sm">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder={t('header.search')}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 focus:bg-white dark:focus:bg-slate-700 transition-all duration-200 rtl:pr-10 rtl:pl-4"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* Language Toggle */}
          <LanguageToggle />

          {/* Notifications */}
          <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-all duration-200">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Settings */}
          <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-all duration-200">
            <Settings className="w-4 h-4" />
          </button>

          {/* User Profile */}
          <button className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-all duration-200">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-medium hidden sm:block">{t('header.profile')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;