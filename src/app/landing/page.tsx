'use client';

import React, { useState } from 'react';
import Radar from '@/components/Radar';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import LanguageToggle from '@/components/LanguageToggle';
import Script from 'next/script';
// Load Leaflet map only on client to avoid SSR errors
const LeafletMap = dynamic(() => import('@/components/LeafletMap'), { ssr: false });
import type { LatLngPoint } from '@/components/LeafletMap';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plane, Package, ShieldCheck } from 'lucide-react';

const stepsOrder = [
  'flight.status.registered',
  'flight.status.pickedUp',
  'flight.status.atAirport',
  'flight.status.inFlight',
  'flight.status.arrived',
  'flight.status.delivered',
] as const;

type StepKey = typeof stepsOrder[number];

type FlightRow = {
  code: string;
  route: string;
  step: StepKey;
};

const sampleFlights: FlightRow[] = [
  { code: 'PSX-238', route: 'IKA → IST', step: 'flight.status.pickedUp' },
  { code: 'PSX-914', route: 'IKA → DXB', step: 'flight.status.atAirport' },
  { code: 'PSX-512', route: 'IKA → FRA', step: 'flight.status.inFlight' },
  { code: 'PSX-771', route: 'IKA → LHR', step: 'flight.status.arrived' },
];

export default function LandingPage() {
  const { t, isRTL } = useLanguage();

  // نقاط واقعی روی نقشه (نمونه)
  const roomPoints: LatLngPoint[] = [
    { id: 'r1', label: 'Toronto Room', lat: 43.6532, lng: -79.3832, color: 'emerald' },
    { id: 'r2', label: 'Mississauga Room', lat: 43.5890, lng: -79.6441, color: 'emerald' },
    { id: 'r3', label: 'Brampton Room', lat: 43.7315, lng: -79.7624, color: 'emerald' },
    { id: 'r4', label: 'Scarborough Room', lat: 43.7734, lng: -79.2578, color: 'emerald' },
    { id: 'r5', label: 'North York Room', lat: 43.7615, lng: -79.4111, color: 'emerald' },
    { id: 'r6', label: 'Markham Room', lat: 43.8561, lng: -79.3370, color: 'emerald' },
    { id: 'r7', label: 'Vaughan Room', lat: 43.8372, lng: -79.5083, color: 'emerald' },
    { id: 'r8', label: 'Richmond Hill Room', lat: 43.8828, lng: -79.4403, color: 'emerald' },
  ];
  const drivingPoints: LatLngPoint[] = [
    { id: 'd1', label: 'Toronto Driving Lessons', lat: 43.6532, lng: -79.3832, color: 'cyan' },
    { id: 'd2', label: 'Etobicoke Driving Lessons', lat: 43.6205, lng: -79.5132, color: 'cyan' },
    { id: 'd3', label: 'Scarborough Driving Lessons', lat: 43.7734, lng: -79.2578, color: 'cyan' },
    { id: 'd4', label: 'North York Driving Lessons', lat: 43.7615, lng: -79.4111, color: 'cyan' },
    { id: 'd5', label: 'Oakville Driving Lessons', lat: 43.4675, lng: -79.6877, color: 'cyan' },
  ];

  const stepIndex = (k: StepKey) => stepsOrder.findIndex(s => s === k);

  // Status colors for donut/chart (kept visually distinct)
  const statusColors: Record<StepKey, string> = {
    'flight.status.registered': 'rgba(59,130,246,0.9)',   // blue-500
    'flight.status.pickedUp': 'rgba(34,197,94,0.9)',      // green-500
    'flight.status.atAirport': 'rgba(250,204,21,0.9)',    // yellow-400
    'flight.status.inFlight': 'rgba(236,72,153,0.9)',     // pink-500
    'flight.status.arrived': 'rgba(6,182,212,0.9)',       // cyan-500
    'flight.status.delivered': 'rgba(139,92,246,0.9)',    // violet-500
  };

  // Distribution for donut ring
  const distribution = stepsOrder.map((s) => sampleFlights.filter(f => f.step === s).length);
  const totalFlights = distribution.reduce((a, b) => a + b, 0) || 1;
  const percents = distribution.map((c) => (c / totalFlights) * 100);
  let acc = 0;
  const donutStops = stepsOrder.map((s, i) => {
    const start = acc;
    const end = acc + percents[i];
    acc = end;
    return `${statusColors[s]} ${start}% ${end}%`;
  }).join(', ');

  // Blips with small origin-destination labels
  const routeBlips = [
    { id: 'r1', x: 28, y: 36, label: 'Tehran-Vancouver' },
    { id: 'r2', x: 64, y: 30, label: 'Istanbul-Toronto' },
    { id: 'r3', x: 40, y: 68, label: 'Tehran-Frankfurt' },
    { id: 'r4', x: 76, y: 58, label: 'Tehran-Dubai' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <Script
        id="goftino-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(){var i="BcQr2J",a=window,d=document;function g(){var g=d.createElement("script"),s="https://www.goftino.com/widget/"+i,l=localStorage.getItem("goftino_"+i);g.async=!0,g.src=l?s+"?o="+l:s;d.getElementsByTagName("head")[0].appendChild(g);} if(d.readyState==="complete"){g()} else {a.addEventListener("load",g,!1);} }();`
        }}
      />
      {/* background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-[520px] h-[520px] rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <section className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="absolute right-6 top-6 rtl:right-auto rtl:left-6 z-20">
          <LanguageToggle />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Hero copy */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 text-emerald-300/90 text-sm border border-emerald-500/30 rounded-full px-3 py-1 bg-emerald-500/10">
              <ShieldCheck className="w-4 h-4" />
              {t('landing.hero.tag')}
            </span>

            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
              {t('landing.title')}
            </h1>
            <p className="mt-4 text-slate-300 max-w-xl">
              {t('landing.subtitle')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 rtl:space-x-reverse">
              <a href="https://t.me/packsibot" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold shadow-lg shadow-emerald-500/20 transition">
                <Package className="w-5 h-5" />
                {t('landing.cta.request')}
              </a>
              <a href="https://t.me/packsiSupport" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800/50 transition">
                <Plane className="w-5 h-5" />
                {t('landing.cta.carrier')}
              </a>
              {/* Auth buttons */}
              <Link href="/auth/login" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-emerald-600 text-emerald-300 hover:bg-emerald-500/10 transition">
                <span className="w-5 h-5">🔑</span>
                {t('auth.login')}
              </Link>
              <Link href="/auth/register" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/20 border border-cyan-500 text-cyan-300 hover:bg-cyan-500/30 transition">
                <span className="w-5 h-5">📝</span>
                {t('auth.register')}
              </Link>
            </div>

            {/* Quick metrics */}
            <div className="mt-8 flex gap-6 text-slate-300">
              <div>
                <div className="text-2xl font-bold text-white">2,500+</div>
                <div className="text-sm">{t('landing.hero.metrics.parcels')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">120+</div>
                <div className="text-sm">{t('landing.hero.metrics.flights')}</div>
              </div>
            </div>
          </div>

          {/* Radar visual (restore original outer color) */}
          <div className="flex justify-center lg:justify-end">
            <Radar size={440} blips={routeBlips} />
          </div>
        </div>
      </section>

      {/* Flights status overview with creative donut + cards */}
      <section className="relative max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-lg md:text-xl text-emerald-300 mb-4">{t('landing.flightStatusTitle')}</h2>
        {/* Legend for donut ring */}
        <div className="mb-3 flex flex-wrap gap-2">
          {stepsOrder.map((s, i) => (
            <span key={s} className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusColors[s] }} />
              <span>{t(s)}</span>
              <span className="text-slate-400">({distribution[i]})</span>
            </span>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Donut chart */}
            <div className="flex justify-center">
              <div className="relative w-64 h-64 rounded-full shadow-inner shadow-slate-800/60"
                   style={{ background: `conic-gradient(${donutStops})` }}>
                {/* glow accents */}
                <div className="absolute -inset-6 rounded-full bg-emerald-500/5 blur-2xl" />
                {/* center hole */}
                <div className="absolute inset-8 rounded-full bg-slate-900/85 border border-slate-700/60 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-white">{totalFlights}</div>
                    <div className="text-xs text-slate-400 mt-1">{t('landing.flightStatusTitle')}</div>
                  </div>
                </div>
                {/* orbiting dot for liveliness */}
                <div className="absolute inset-0 animate-[spin_16s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
                </div>
              </div>
            </div>

            {/* Flight cards */}
            <div className="lg:col-span-2 space-y-4">
              {sampleFlights.map((f) => {
                const idx = stepIndex(f.step);
                return (
                  <div key={f.code} className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-mono text-sm">{f.code}</div>
                        <div className="text-slate-400 text-xs">{f.route}</div>
                      </div>
                      <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/60 border border-slate-700/60 text-xs text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusColors[stepsOrder[idx]] }} />
                        {t(stepsOrder[idx])}
                      </span>
                    </div>

                    {/* segmented progress bar with glow */}
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1 grid grid-cols-6 gap-1">
                        {stepsOrder.map((s, i) => (
                          <div key={s} className="relative h-2 rounded-full overflow-hidden">
                            <div className="absolute inset-0" style={{ backgroundColor: i <= idx ? statusColors[s] : 'rgba(15,23,42,0.8)' }} />
                            {i === idx && (
                              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services section as tiles */}
      <section className="relative max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-lg md:text-xl text-emerald-300 mb-2">{t('landing.services.title')}</h2>
        <p className="text-slate-400 text-sm">
          {t('landing.services.desc')}
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tile: Room Rentals */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4">
            <h3 className="text-base md:text-lg text-emerald-300">{t('services.roomRental')}</h3>
            <p className="text-slate-400 text-xs md:text-sm mt-1">{t('services.roomRental.desc')}</p>
            <div className="mt-4">
              <LeafletMap points={roomPoints} center={{ lat: 43.6532, lng: -79.3832 }} zoom={9} height={320} />
            </div>
          </div>

          {/* Tile: Driving Lessons */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4">
            <h3 className="text-base md:text-lg text-cyan-300">{t('landing.driving.title')}</h3>
            <p className="text-slate-400 text-xs md:text-sm mt-1">{t('landing.driving.desc')}</p>
            <div className="mt-4">
              <LeafletMap points={drivingPoints} center={{ lat: 43.6532, lng: -79.3832 }} zoom={9} height={320} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer with links, address and documents */}
      <footer className="border-t border-slate-800/60 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-300">
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{t('footer.links')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-white">{t('footer.about')}</a></li>
              <li><a href="/services" className="hover:text-white">{t('footer.services')}</a></li>
              <li><a href="/contact" className="hover:text-white">{t('footer.contact')}</a></li>
              <li><a href="https://t.me/packsiSupport" className="hover:text-white">{t('footer.support')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{t('footer.address')}</h4>
            <p className="text-sm leading-6">
              Toronto, Ontario, Canada
              <br />
              Email: support@packsi.io
              <br />
              Phone: +1 (416) 000-0000
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{t('footer.documents')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/docs/terms" className="hover:text-white">{t('footer.terms')}</a></li>
              <li><a href="/docs/privacy" className="hover:text-white">{t('footer.privacy')}</a></li>
              <li><a href="/docs/help" className="hover:text-white">Help & FAQs</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}