'use client';

import React from 'react';
import Radar from '@/components/Radar';
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

  const stepIndex = (k: StepKey) => stepsOrder.findIndex(s => s === k);

  // Blips with small origin-destination labels
  const routeBlips = [
    { id: 'r1', x: 28, y: 36, label: 'Tehran-Vancouver' },
    { id: 'r2', x: 64, y: 30, label: 'Istanbul-Toronto' },
    { id: 'r3', x: 40, y: 68, label: 'Tehran-Frankfurt' },
    { id: 'r4', x: 76, y: 58, label: 'Tehran-Dubai' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-[520px] h-[520px] rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <section className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Hero copy */}
          <div className="text-white font-persian">
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
              <a href="#request" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold shadow-lg shadow-emerald-500/20 transition">
                <Package className="w-5 h-5" />
                {t('landing.cta.request')}
              </a>
              <a href="#carrier" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800/50 transition">
                <Plane className="w-5 h-5" />
                {t('landing.cta.carrier')}
              </a>
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

          {/* Radar visual */}
          <div className="flex justify-center lg:justify-end">
            <Radar size={440} blips={routeBlips} />
          </div>
        </div>
      </section>

      {/* Flights status table */}
      <section className="relative max-w-7xl mx-auto px-6 pb-24">
        <h2 className="font-persian text-lg md:text-xl text-emerald-300 mb-4">{t('landing.flightStatusTitle')}</h2>
        <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 text-slate-300 px-4 py-3 text-sm border-b border-slate-700/60">
            <div className="col-span-4 sm:col-span-3">Code</div>
            <div className="col-span-8 sm:col-span-3">Route</div>
            <div className="hidden sm:block sm:col-span-6">Progress</div>
          </div>
          {sampleFlights.map((f) => {
            const idx = stepIndex(f.step);
            return (
              <div key={f.code} className="grid grid-cols-12 items-center px-4 py-4 border-b border-slate-800/50 last:border-0">
                <div className="col-span-4 sm:col-span-3 text-white font-mono text-sm">{f.code}</div>
                <div className="col-span-8 sm:col-span-3 text-slate-300">{f.route}</div>
                <div className="hidden sm:flex sm:col-span-6 items-center gap-2">
                  {/* Steps line */}
                  <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${(idx / (stepsOrder.length - 1)) * 100}%` }} />
                  </div>
                  <div className="text-xs text-slate-400 font-persian whitespace-nowrap">
                    {t(stepsOrder[idx])}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}