"use client";

import React from "react";
import type { Icon } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export type LatLngPoint = {
  id: string;
  label: string;
  lat: number;
  lng: number;
  color?: "emerald" | "cyan" | "violet" | "rose";
};

export default function LeafletMap({
  points,
  center = { lat: 32.0, lng: 53.0 },
  zoom = 5,
  height = 320,
}: {
  points: LatLngPoint[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: number;
}) {
  const [markerIcon, setMarkerIcon] = React.useState<Icon | null>(null);
  // Fix default icon paths using CDN to avoid Next static path issues
  // Load Leaflet dynamically on client to avoid SSR "window is not defined"
  React.useEffect(() => {
    let isMounted = true;
    import("leaflet").then(({ default: L }) => {
      if (!isMounted) return;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      const icon = new L.Icon({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      setMarkerIcon(icon);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  const colorToHex = (c?: LatLngPoint["color"]) => {
    switch (c) {
      case "emerald":
        return "#10b981";
      case "cyan":
        return "#06b6d4";
      case "violet":
        return "#8b5cf6";
      case "rose":
        return "#f43f5e";
      default:
        return "#10b981";
    }
  };

  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900"
      style={{ height }}
    >
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((p) => (
          <React.Fragment key={p.id}>
            <CircleMarker
              center={[p.lat, p.lng]}
              radius={8}
              pathOptions={{ color: colorToHex(p.color), fillColor: colorToHex(p.color), fillOpacity: 0.8 }}
            />
            {markerIcon && (
              <Marker position={[p.lat, p.lng]} icon={markerIcon}>
                <Popup>{p.label}</Popup>
              </Marker>
            )}
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
}