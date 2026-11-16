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

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [selectedCampus.center.lat, selectedCampus.center.lng],
        zoom: 14,
        zoomControl: true
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
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

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([selectedCampus.center.lat, selectedCampus.center.lng], 14, {
        animate: true
      });
    }
  }, [selectedCampus]);

  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    // Campus Center Marker (No emojis)
    const campusIcon = L.divIcon({
      className: 'custom-campus-pin',
      html: `
        <div style="background: #0f172a; color: white; padding: 5px 10px; border-radius: 20px; font-weight: 700; font-size: 11px; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.2); white-space: nowrap;">
          ${selectedCampus.shortName}
        </div>
      `,
      iconSize: [110, 28],
      iconAnchor: [55, 14]
    });

    L.marker([selectedCampus.center.lat, selectedCampus.center.lng], { icon: campusIcon })
      .bindPopup(`<strong>${selectedCampus.name}</strong><br/>Campus Epicenter`)
      .addTo(markersLayerRef.current);

    // Hostel Markers (No emojis)
    hostels.forEach((hostel) => {
      const markerIcon = L.divIcon({
        className: 'custom-hostel-pin',
        html: `
          <div style="background: #2563eb; color: white; padding: 4px 8px; border-radius: 8px; font-weight: 700; font-size: 11px; border: 2px solid white; box-shadow: 0 2px 8px rgba(37,99,235,0.3); cursor: pointer;">
            GHS ${Math.round(hostel.priceMin / 1000)}k
          </div>
        `,
        iconSize: [64, 24],
        iconAnchor: [32, 12]
      });

      const marker = L.marker([hostel.latitude, hostel.longitude], { icon: markerIcon });

      const popupContent = document.createElement('div');
      popupContent.style.minWidth = '190px';
      popupContent.innerHTML = `
        <div style="font-family: inherit;">
          <img src="${hostel.photos[0]}" style="width: 100%; height: 85px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;" />
          <div style="font-weight: 700; font-size: 12px; color: #0f172a;">${hostel.name}</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${hostel.distanceKm} km • Rating: ${hostel.rating.toFixed(1)}</div>
          <div style="font-weight: 700; font-size: 11px; color: #2563eb; margin-top: 3px;">From GHS ${hostel.priceMin.toLocaleString()} /sem</div>
          <button id="view-hostel-${hostel.id}" style="width: 100%; margin-top: 8px; background: #0f172a; color: white; border: none; padding: 5px; border-radius: 6px; font-weight: 600; font-size: 11px; cursor: pointer;">
            View Details
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
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-slate-200 z-0`}>
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
