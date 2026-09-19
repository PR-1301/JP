import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { LandRecord } from '../../data/mockData';
import { StatusBadge } from './StatusBadge';

// Fix Leaflet's default icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customMarkerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const pulseIcon = new L.DivIcon({
  className: 'custom-pulse-marker',
  html: `<div class="relative w-4 h-4 bg-indigo-500 rounded-full border-2 border-white shadow-md"><div class="pulse-ring"></div></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

interface MapComponentProps {
  records: LandRecord[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
}

// Component to dynamically update map center and fix resizing bugs
const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
    // Fix leaflet map rendering bug in tabs/modals by invalidating size after a short delay
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [center, zoom, map]);
  
  return null;
};

export const MapComponent: React.FC<MapComponentProps> = ({ 
  records, 
  center = [17.3850, 78.4867], 
  zoom = 13,
  height = "400px",
  className = ""
}) => {
  // If only one record, center on it
  const mapCenter = records.length === 1 ? records[0].coordinates : center;

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-neutral-200/80 shadow-soft ${className}`} style={{ height }}>
      <MapContainer 
        center={mapCenter} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        scrollWheelZoom={false}
      >
        <ChangeView center={mapCenter} zoom={zoom} />
        
        {/* Subtle, minimal map tiles (CartoDB Positron) for premium feel */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {records.map(record => (
          <Marker 
            key={record.id} 
            position={record.coordinates}
            icon={record.status === 'litigation' || record.status === 'disputed' ? pulseIcon : customMarkerIcon}
          >
            <Popup className="premium-popup">
              <div className="p-1 space-y-2 min-w-[200px]">
                <div className="flex justify-between items-start gap-3">
                  <h4 className="font-serif font-bold text-neutral-900 leading-none">{record.surveyNumber}</h4>
                  <StatusBadge status={record.status} />
                </div>
                <div className="space-y-1 mt-2">
                  <div className="flex items-center text-xs text-neutral-600">
                    <span className="font-semibold w-16">Owner:</span> {record.ownerName}
                  </div>
                  <div className="flex items-center text-xs text-neutral-600">
                    <span className="font-semibold w-16">Area:</span> {record.area}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Overlay gradient for premium blending */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-neutral-900/5 rounded-2xl"></div>
    </div>
  );
};
