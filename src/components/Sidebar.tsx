'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

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
    <div className="w-64 bg-slate-800 text-white min-h-screen flex flex-col sidebar fixed md:relative z-50 md:z-auto rtl:text-right font-persian">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse rtl:flex-row-reverse rtl:justify-end">
          <div className="text-2xl font-bold text-blue-400">PACK</div>
          <div className="text-2xl font-bold text-orange-400">si</div>
        </div>
        <div className="text-sm text-slate-400 mt-1 rtl:text-right">Cjc137</div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-6">
        <nav className="space-y-2 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 rtl:space-x-reverse rtl:flex-row-reverse px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium rtl:text-right">{item.label}</span>
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
    </div>
  );
};

export default Sidebar;