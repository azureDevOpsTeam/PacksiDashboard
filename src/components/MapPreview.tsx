import React from "react";
import Image from "next/image";
import worldImg from "@/assets/images/world.png";

type Point = {
  id: string;
  label: string;
  x: number; // left percent
  y: number; // top percent
  color: "emerald" | "cyan" | "violet" | "rose";
};

export default function MapPreview({
  points,
  title,
}: {
  points: Point[];
  title?: string;
}) {
  return (
    <div className="space-y-3">
      {title && (
        <div className="text-sm text-slate-400">
          {title}
        </div>
      )}
      <div
        className="relative overflow-hidden rounded-2xl border border-slate-700/40 bg-slate-900"
        style={{ width: 720, height: 400 }}
      >
        {/* Subtle world background */}
        <div className="absolute inset-0 opacity-20 mix-blend-soft-light">
          <Image
            src={worldImg}
            alt="map background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.12]">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.2)_1px,transparent_1px)] bg-[length:24px_24px]" />
        </div>

        {/* Markers */}
        {points.map((p) => {
          const colorMap: Record<Point["color"], string> = {
            emerald: "emerald",
            cyan: "cyan",
            violet: "violet",
            rose: "rose",
          };
          const c = colorMap[p.color] || "emerald";
          return (
            <div
              key={p.id}
              className="absolute"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* ping ring */}
              <span
                className={`absolute -left-2 -top-2 h-6 w-6 rounded-full bg-${c}-400/30 animate-ping`}
              />
              {/* dot */}
              <span
                className={`relative inline-block h-2.5 w-2.5 rounded-full bg-${c}-400 shadow-[0_0_12px_rgba(0,0,0,0.5)]`}
              />
              {/* label */}
              <div
                className={`mt-2 px-2 py-1 text-xs rounded-md bg-slate-800/70 border border-slate-700/60 text-slate-200 backdrop-blur-sm`}
              >
                {p.label}
              </div>
            </div>
          );
        })}

        {/* soft vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          boxShadow: "inset 0 0 120px rgba(0,0,0,0.35)",
        }} />
      </div>
    </div>
  );
}