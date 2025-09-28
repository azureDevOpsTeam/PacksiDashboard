'use client';

import React from 'react';
import Image from 'next/image';
import worldImg from '@/assets/images/world.png';

type Blip = {
  id: string;
  x: number; // 0..100 percentage within the circle
  y: number; // 0..100 percentage within the circle
  label?: string;
};

const defaultBlips: Blip[] = [
  { id: 'b1', x: 22, y: 35, label: 'FL-238' },
  { id: 'b2', x: 68, y: 28, label: 'FL-914' },
  { id: 'b3', x: 30, y: 70, label: 'FL-512' },
  { id: 'b4', x: 78, y: 62, label: 'FL-771' },
  { id: 'b5', x: 50, y: 12, label: 'FL-406' },
];

export default function Radar({ blips = defaultBlips, size = 420 }: { blips?: Blip[]; size?: number }) {
  return (
    <div className="relative select-none" style={{ width: size, height: size }}>
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-2xl" />

      {/* Radar body */}
      <div className="absolute inset-0 rounded-full overflow-hidden border border-emerald-500/30 bg-slate-900/90">
        {/* World overlay (faded, creative) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute inset-0 origin-center animate-[world-drift_28s_linear_infinite] opacity-30 mix-blend-soft-light saturate-150"
            style={{
              WebkitMaskImage:
                'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.95) 34%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0) 100%)',
              maskImage:
                'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.95) 34%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0) 100%)'
            }}
          >
            <Image
              src={worldImg}
              alt="World map"
              fill
              className="object-contain md:object-cover scale-105 blur-[0.3px]"
              priority={false}
            />
          </div>
        </div>

        {/* Rings */}
        <div className="absolute inset-0 rounded-full" style={{
          background:
            'radial-gradient(circle at center, rgba(16,185,129,0.25) 1px, transparent 1px) 0 0/24px 24px, radial-gradient(circle at center, rgba(16,185,129,0.12) 0, rgba(16,185,129,0.12) 1px, transparent 1px) 0 0/120px 120px'
        }} />

        {/* Crosshair */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-emerald-500/20" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 h-px w-full bg-emerald-500/20" />

        {/* Sweep (centered) + inner glow */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 origin-center animate-[radar-sweep_2.8s_linear_infinite]"
            style={{
              background:
                'conic-gradient(from 0deg at 50% 50%, rgba(16,185,129,0.35), rgba(16,185,129,0.0) 45deg, transparent 360deg)'
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.14) 0%, rgba(16,185,129,0.07) 18%, rgba(16,185,129,0.0) 42%)'
            }}
          />
        </div>

        {/* Blips */}
        {blips.map((b) => (
          <div key={b.id}
               className="absolute"
               style={{ left: `${b.x}%`, top: `${b.y}%` }}>
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <span className="block w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-[blip_1.8s_ease-in-out_infinite]" />
              {b.label && (
                <span className="absolute mt-2 text-[10px] px-1.5 py-0.5 rounded bg-slate-900/80 border border-emerald-500/30 text-emerald-200 whitespace-nowrap left-2 rtl:left-auto rtl:right-2">
                  {b.label}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Decorative dots */}
      <div className="absolute -inset-3 -z-10">
        <div className="w-full h-full rounded-full border border-emerald-500/10" />
      </div>

      <style jsx>{`
        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blip {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
        @keyframes world-drift {
          0% { transform: rotate(-7deg) scale(1.02); }
          50% { transform: rotate(7deg) scale(1.05); }
          100% { transform: rotate(-7deg) scale(1.02); }
        }
      `}</style>
    </div>
  );
}