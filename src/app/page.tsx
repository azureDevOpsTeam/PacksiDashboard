'use client';

import React from 'react';
import { Package, Users, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Stat Card Component
const StatCard = ({ title, value, change, changeType, icon: Icon, color }: {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: any;
  color: string;
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{value}</p>
          <div className="flex items-center mt-2">
            {changeType === 'increase' ? (
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ml-1 ${
              changeType === 'increase' ? 'text-green-500' : 'text-red-500'
            }`}>
              {change}
            </span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ title, description, icon, color }: {
  title: string;
  description: string;
  icon: string;
  color: string;
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('stats.totalUsers'),
      value: '2,543',
      change: '+12%',
      changeType: 'increase' as const,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: t('stats.totalPackages'),
      value: '1,234',
      change: '+8%',
      changeType: 'increase' as const,
      icon: Package,
      color: 'bg-green-500'
    },
    {
      title: t('stats.usdBalance'),
      value: '$12,345',
      change: '+15%',
      changeType: 'increase' as const,
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      title: t('stats.packagesInTransit'),
      value: '23%',
      change: '-2%',
      changeType: 'decrease' as const,
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const services = [
    {
      title: t('services.parcelList'),
      description: t('services.parcelList.desc'),
      icon: '👥',
      color: 'bg-blue-500'
    },
    {
      title: t('services.roomRental'),
      description: t('services.roomRental.desc'),
      icon: '📦',
      color: 'bg-green-500'
    },
    {
      title: t('services.carRental'),
      description: t('services.carRental.desc'),
      icon: '📊',
      color: 'bg-purple-500'
    },
    {
      title: t('services.personalServices'),
      description: t('services.personalServices.desc'),
      icon: '📈',
      color: 'bg-orange-500'
    }
  ];

  const quickActions = [
    { title: t('quickActions.addUser'), icon: '➕', color: 'bg-blue-500' },
    { title: t('services.createRequest'), icon: '📦', color: 'bg-green-500' },
    { title: t('quickActions.viewReports'), icon: '📊', color: 'bg-purple-500' },
    { title: t('quickActions.settings'), icon: '⚙️', color: 'bg-gray-500' }
  ];

  return (
    <div className="p-6 space-y-6 font-persian">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('header.dashboard')}</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">{t('header.welcome')}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Services Section */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{t('services.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{t('quickActions.title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow text-center"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.color} mx-auto mb-2`}>
                <span className="text-2xl">{action.icon}</span>
              </div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{action.title}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
