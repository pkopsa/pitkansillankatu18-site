"use client";

import { useEffect, useRef } from "react";

// Pitkänsillankatu 18 A — Terassitalo, kadun puoleinen sisäänkäynti
const LAT = 63.83795;
const LNG = 23.13010;

export default function PropertyMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let map: import("leaflet").Map | null = null;

    async function init() {
      const L = (await import("leaflet")).default;

      // Leafletin oletuskuvakkeet rikkoontuvat Next.js:ssä — korjataan
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!containerRef.current) return;
      map = L.map(containerRef.current, {
        center: [LAT, LNG],
        zoom: 17,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
        attributionControl: true,
      });

      // Voyager — värikäs ja selkeä, hyvä kontrasti
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        maxZoom: 20,
      }).addTo(map);

      // Oma tyylitelty markeri
      const markerHtml = `
        <div style="
          display:flex;flex-direction:column;align-items:center;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.7));
        ">
          <div style="
            background: #14b8a6;
            color: #f8fafc;
            font-weight: 900;
            font-size: 13px;
            font-family: sans-serif;
            white-space: nowrap;
            padding: 6px 14px;
            border-radius: 999px;
            letter-spacing: 0.05em;
            box-shadow: 0 2px 12px rgba(0,0,0,0.5);
          ">Pitkänsillankatu 18</div>
          <div style="
            width: 3px;
            height: 18px;
            background: #14b8a6;
            margin-top: -1px;
          "></div>
          <div style="
            width: 14px;
            height: 14px;
            background: #14b8a6;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.6);
            margin-top: -1px;
          "></div>
        </div>
      `;

      const icon = L.divIcon({
        html: markerHtml,
        className: "",
        iconSize: [160, 72],
        iconAnchor: [80, 72],
        popupAnchor: [0, -72],
      });

      L.marker([LAT, LNG], { icon })
        .addTo(map)
        .bindPopup(
          `<strong style="font-size:14px">Pitkänsillankatu 18 A</strong><br/>67100 Kokkola<br/><em style="color:#888">Terassitalo</em>`,
          { offset: [0, -60] }
        )
        .openPopup();
    }

    init();
    return () => { map?.remove(); };
  }, []);

  return (
    <>
      {/* Leafletin CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <div ref={containerRef} className="w-full h-[480px]" />
    </>
  );
}
