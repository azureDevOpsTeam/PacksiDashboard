'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { User } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const { t } = useLanguage();

  const menuItems = [
    {
      icon: '🏠',
      label: t('sidebar.home'),
      href: '/',
      active: pathname === '/'
    },
    {
      icon: '📊',
      label: t('sidebar.requests'),
      href: '/requests',
      active: pathname === '/requests'
    },
    {
      icon: '📦',
      label: t('sidebar.parcels'),
      href: '/parcels',
      active: pathname === '/parcels'
    },
    {
      icon: '💬',
      label: t('sidebar.chat'),
      href: '/chat',
      active: pathname === '/chat'
    },
    {
      icon: '⚙️',
      label: t('sidebar.settings'),
      href: '/settings',
      active: pathname === '/settings'
    }
  ];

  const adminItems = [
    { icon: '👥', title: t('sidebar.userManagement'), description: t('sidebar.userManagement.desc'), href: '/admin/users' },
    { icon: '📢', title: t('sidebar.advertisement'), description: t('sidebar.advertisement.desc'), href: '/admin/ads' },
    { icon: '📊', title: t('sidebar.reports'), description: t('sidebar.reports.desc'), href: '/admin/reports' },
    { icon: '🎫', title: t('sidebar.sendTicker'), description: t('sidebar.sendTicker.desc'), href: '/admin/tickets' },
    { icon: '📤', title: t('sidebar.sendedParcel'), description: t('sidebar.sendedParcel.desc'), href: '/admin/parcels' },
  ];

  return (
    <aside className="w-64 bg-slate-900/95 backdrop-blur-sm text-white min-h-screen flex flex-col sidebar fixed md:relative z-50 md:z-auto rtl:text-right font-persian border-r border-slate-700/50">
      {/* Logo */}
      <div className="p-5 border-b border-slate-700/50">
        <div className="flex items-center space-x-3 rtl:space-x-reverse rtl:flex-row-reverse rtl:justify-end">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <div>
            <h1 className="text-lg font-bold rtl:text-right">Packsi</h1>
            <p className="text-slate-400 text-xs">{t('header.dashboard')}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-6">
        <nav className="space-y-1 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 rtl:space-x-reverse rtl:flex-row-reverse px-4 py-3 rounded-xl transition-all duration-200 ${
                item.active
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1 rtl:hover:-translate-x-1'
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="font-medium rtl:text-right text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Admin Panel Section */}
        <div className="mt-8 px-4">
          <h3 className="text-blue-400 font-semibold mb-4 rtl:text-right">{t('sidebar.adminPanel')}</h3>
          <div className="space-y-2">
              {adminItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors group rtl:space-x-reverse rtl:flex-row-reverse"
              >
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1 rtl:text-right">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-slate-400 group-hover:text-slate-300">
                    {item.description}
                  </div>
                </div>
                <span className="text-slate-500 group-hover:text-slate-300 rtl:rotate-180">›</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center shadow-sm">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{t('sidebar.user')}</p>
            <p className="text-xs text-slate-400">{t('sidebar.admin')}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;