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

  // Construct WhatsApp inquiry link
  const inquiryMessage = encodeURIComponent(
    `Hello, I saw ${hostel.name} on HostelSearch. I am a student looking for room availability and pricing for this semester. Please provide more details.`
  );
  const whatsappUrl = `https://wa.me/${hostel.whatsappNumber.replace(/[^\d]/g, '')}?text=${inquiryMessage}`;

  return (
    <div 
      onClick={() => onSelect(hostel)}
      className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Top Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={currentPhoto}
          alt={hostel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{hostel.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({hostel.reviewCount})</span>
            </span>
            {hostel.verified && (
              <span className="inline-flex items-center gap-1 bg-brand-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Compare Checkbox */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(hostel);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isCompared
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-black/30 text-white hover:bg-black/50'
              }`}
              title={isCompared ? 'Remove from compare' : 'Add to compare'}
            >
              <GitCompare className="w-3.5 h-3.5" />
            </button>

            {/* Bookmark Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(hostel.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isBookmarked
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-black/30 text-white hover:bg-black/50'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Save hostel'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Photo Navigation Arrows */}
        {hostel.photos.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevPhoto}
              className="p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPhoto}
              className="p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Image Info */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white pointer-events-none">
          <div className="flex items-center gap-1 text-[11px] font-semibold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span>{hostel.distanceKm} km • {hostel.walkTimeMins} mins walk</span>
          </div>
          <span className="text-[11px] font-medium bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">
            {hostel.gender}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Hostel Title & Area */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                {hostel.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1 line-clamp-1">
                <span>{hostel.area}</span>
                <span>•</span>
                <span>{hostel.campusName}</span>
              </p>
            </div>
          </div>

          {/* Critical Ghanaian Amenities Chips */}
          <div className="mt-3.5 flex items-center gap-1.5 flex-wrap">
            {hostel.isDumsorProof && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/80 px-2 py-0.5 rounded-md">
                <Zap className="w-3 h-3 text-amber-600 fill-amber-500" />
                <span>Dumsor Proof</span>
              </span>
            )}
            {hostel.hasWaterReserve && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-cyan-50 text-cyan-800 border border-cyan-200/80 px-2 py-0.5 rounded-md">
                <Droplets className="w-3 h-3 text-cyan-600" />
                <span>Water Tank</span>
              </span>
            )}
            {hostel.hasFreeShuttle && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200/80 px-2 py-0.5 rounded-md">
                <Bus className="w-3 h-3 text-blue-600" />
                <span>Shuttle</span>
              </span>
            )}
            {hostel.hasFreeWifi && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                <Wifi className="w-3 h-3 text-emerald-600" />
                <span>WiFi</span>
              </span>
            )}
          </div>

          {/* Room Availability Pill Highlights */}
          <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-1.5 text-[11px]">
            {hostel.rooms.slice(0, 2).map((r, i) => (
              <div key={i} className="bg-slate-50 px-2 py-1 rounded-lg border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600 font-medium truncate">{r.type.replace('-in-a-room', ' in 1')}</span>
                <span className="font-bold text-slate-900 shrink-0">₵{r.pricePerSemester.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer: Pricing & Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Starting From</span>
            <div className="text-base font-extrabold text-slate-900">
              GHS {hostel.priceMin.toLocaleString()}
              <span className="text-xs font-normal text-slate-500"> /sem</span>
            </div>
          </div>

          {/* Contact & Map Action Buttons */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <a
              href={`tel:${hostel.phoneNumber}`}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title={`Call ${hostel.phoneNumber}`}
            >
              <Phone className="w-4 h-4" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
              title="Chat with hostel manager on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <a
              href={hostel.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 transition-colors"
              title="Open in Google Maps"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
