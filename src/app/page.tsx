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
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">{title}</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white mt-2">{value}</p>
          <div className="flex items-center mt-3">
            {changeType === 'increase' ? (
              <ArrowUpRight className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
            )}
            <span className={`text-xs font-medium ml-1 ${
              changeType === 'increase' ? 'text-green-500' : 'text-red-500'
            }`}>
              {change}
            </span>
          </div>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color} shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
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
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color} mb-4 shadow-lg`}>
        <span className="text-lg">{icon}</span>
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
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
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 text-center group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color} mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                <span className="text-lg">{action.icon}</span>
              </div>
              <p className="text-xs font-medium text-slate-900 dark:text-white">{action.title}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
