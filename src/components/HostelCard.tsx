import React, { useState } from 'react';
import { 
  Star, MapPin, Zap, Droplets, Wifi, Bus, Phone, 
  MessageCircle, Bookmark, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2, GitCompare 
} from 'lucide-react';
import { Hostel } from '../types/hostel';

interface HostelCardProps {
  hostel: Hostel;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  isCompared: boolean;
  onToggleCompare: (hostel: Hostel) => void;
  onSelect: (hostel: Hostel) => void;
}

export const HostelCard: React.FC<HostelCardProps> = ({
  hostel,
  isBookmarked,
  onToggleBookmark,
  isCompared,
  onToggleCompare,
  onSelect
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % hostel.photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + hostel.photos.length) % hostel.photos.length);
  };

  const currentPhoto = hostel.photos[photoIndex] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=80';

  const hasPhone = Boolean(hostel.phoneNumber && hostel.phoneNumber.trim().length > 5);
  const whatsappUrl = hasPhone ? `https://wa.me/${hostel.whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
    `Hello, I saw ${hostel.name} on HostelSearch. Is there room availability for this semester?`
  )}` : '';

  return (
    <div 
      onClick={() => onSelect(hostel)}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Photo Section */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={currentPhoto}
            alt={hostel.name}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
          />

          {/* Top Actions */}
          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center gap-1 bg-white/95 text-slate-800 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>{hostel.rating.toFixed(1)}</span>
                {hostel.reviewCount > 0 && (
                  <span className="text-slate-400 font-normal">({hostel.reviewCount})</span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare(hostel);
                }}
                className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                  isCompared ? 'bg-brand-600 text-white' : 'bg-black/40 text-white hover:bg-black/60'
                }`}
                title="Compare"
              >
                <GitCompare className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(hostel.id);
                }}
                className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                  isBookmarked ? 'bg-rose-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'
                }`}
                title="Save"
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Bottom Photo Pill */}
          <div className="absolute bottom-2.5 left-2.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-full">
              <MapPin className="w-3 h-3 text-brand-300" />
              <span>{hostel.distanceKm} km • {hostel.walkTimeMins} mins walk</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-sm text-slate-900 group-hover:text-brand-600 transition-colors truncate">
            {hostel.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 truncate">
            {hostel.area} • {hostel.campusName}
          </p>

          {/* Standard Icon Chips (No Emojis) */}
          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
            {hostel.isDumsorProof && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded">
                <Zap className="w-3 h-3 text-amber-600" />
                <span>Generator</span>
              </span>
            )}
            {hostel.hasWaterReserve && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200 px-1.5 py-0.5 rounded">
                <Droplets className="w-3 h-3 text-cyan-600" />
                <span>Water Reserve</span>
              </span>
            )}
            {hostel.hasFreeShuttle && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200 px-1.5 py-0.5 rounded">
                <Bus className="w-3 h-3 text-blue-600" />
                <span>Shuttle</span>
              </span>
            )}
            {hostel.hasFreeWifi && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded">
                <Wifi className="w-3 h-3 text-emerald-600" />
                <span>WiFi</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 font-medium block">Starting from</span>
          <span className="text-sm font-bold text-slate-900">
            GHS {hostel.priceMin.toLocaleString()}
            <span className="text-[10px] font-normal text-slate-500"> /sem</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {hasPhone ? (
            <>
              <a
                href={`tel:${hostel.phoneNumber}`}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                title="Call"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white"
                title="WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </>
          ) : null}

          <a
            href={hostel.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700"
            title="Google Maps"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
