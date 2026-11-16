import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Campus, Hostel } from '../types/hostel';

interface HostelMapProps {
  campuses: Campus[];
  selectedCampus: Campus;
  hostels: Hostel[];
  onSelectHostel: (hostel: Hostel) => void;
  heightClass?: string;
}

export const HostelMap: React.FC<HostelMapProps> = ({
  selectedCampus,
  hostels,
  onSelectHostel,
  heightClass = 'h-[600px]'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [selectedCampus.center.lat, selectedCampus.center.lng],
        zoom: 14,
        zoomControl: true
      });

      // CartoDB Positron / OSM tiles for a clean, sleek modern look
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update center when selectedCampus changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([selectedCampus.center.lat, selectedCampus.center.lng], 14, {
        animate: true
      });
    }
  }, [selectedCampus]);

  // Update markers when hostels change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    // Add Campus Center Marker
    const campusIcon = L.divIcon({
      className: 'custom-campus-pin',
      html: `
        <div style="background: #1e293b; color: white; padding: 6px 10px; border-radius: 9999px; font-weight: 800; font-size: 11px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2px solid white; display: flex; align-items: center; gap: 4px; white-space: nowrap;">
          <span>🎓</span>
          <span>${selectedCampus.shortName}</span>
        </div>
      `,
      iconSize: [120, 30],
      iconAnchor: [60, 15]
    });

    L.marker([selectedCampus.center.lat, selectedCampus.center.lng], { icon: campusIcon })
      .bindPopup(`<strong>${selectedCampus.name}</strong><br/>Campus Epicenter`)
      .addTo(markersLayerRef.current);

    // Add Hostel Markers
    hostels.forEach((hostel) => {
      const isDumsor = hostel.isDumsorProof ? '⚡' : '';
      const markerIcon = L.divIcon({
        className: 'custom-hostel-pin',
        html: `
          <div style="background: #2563eb; color: white; padding: 4px 8px; border-radius: 12px; font-weight: 800; font-size: 11px; box-shadow: 0 4px 14px rgba(37,99,235,0.4); border: 2px solid white; display: flex; align-items: center; gap: 3px; cursor: pointer; transition: transform 0.2s;">
            <span>₵${Math.round(hostel.priceMin / 1000)}k</span>
            <span>${isDumsor}</span>
          </div>
        `,
        iconSize: [60, 26],
        iconAnchor: [30, 13]
      });

      const marker = L.marker([hostel.latitude, hostel.longitude], { icon: markerIcon });

      const popupContent = document.createElement('div');
      popupContent.style.minWidth = '200px';
      popupContent.innerHTML = `
        <div style="font-family: inherit;">
          <img src="${hostel.photos[0]}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 8px; margin-bottom: 6px;" />
          <div style="font-weight: 700; font-size: 13px; color: #0f172a;">${hostel.name}</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${hostel.distanceKm} km • ⭐ ${hostel.rating.toFixed(1)} (${hostel.reviewCount})</div>
          <div style="font-weight: 800; font-size: 12px; color: #2563eb; margin-top: 4px;">From GHS ${hostel.priceMin.toLocaleString()} /sem</div>
          <button id="view-hostel-${hostel.id}" style="width: 100%; margin-top: 8px; background: #2563eb; color: white; border: none; padding: 6px; border-radius: 6px; font-weight: 700; font-size: 11px; cursor: pointer;">
            View Full Details
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`view-hostel-${hostel.id}`);
        if (btn) {
          btn.onclick = () => onSelectHostel(hostel);
        }
      });

      marker.addTo(markersLayerRef.current!);
    });
  }, [hostels, selectedCampus]);

  return (
    <div className={`relative w-full ${heightClass} rounded-3xl overflow-hidden border border-slate-200 shadow-sm z-0`}>
      <div ref={mapContainerRef} className="w-full h-full" />
      
      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-slate-200 shadow-md text-xs font-semibold text-slate-700 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-slate-900" />
          <span>Campus Gate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-brand-600" />
          <span>Hostel Location</span>
        </div>
        <div className="flex items-center gap-1">
          <span>⚡</span>
          <span>Dumsor Backup</span>
        </div>
      </div>
    </div>
  );
};
