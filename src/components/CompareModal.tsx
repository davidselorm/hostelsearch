import React from 'react';
import { X, Star, Zap, Droplets, Wifi, Bus, ShieldCheck, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Hostel } from '../types/hostel';

interface CompareModalProps {
  hostels: Hostel[];
  onClose: () => void;
  onRemove: (hostelId: string) => void;
  onSelectHostel: (hostel: Hostel) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  hostels,
  onClose,
  onRemove,
  onSelectHostel
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Compare Hostels Side-by-Side</h2>
            <p className="text-xs text-slate-500">Evaluating {hostels.length} selected student hostels</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="p-5 overflow-x-auto">
          <div className="min-w-[650px] grid grid-cols-4 gap-4">
            
            {/* Criteria Column */}
            <div className="space-y-6 pt-44 font-semibold text-xs text-slate-500">
              <div className="py-2 border-b border-slate-100">Google Rating</div>
              <div className="py-2 border-b border-slate-100">Price (Starting / Sem)</div>
              <div className="py-2 border-b border-slate-100">Distance to Campus</div>
              <div className="py-2 border-b border-slate-100">Dumsor Generator Backup</div>
              <div className="py-2 border-b border-slate-100">Water Storage / Borehole</div>
              <div className="py-2 border-b border-slate-100">Free Campus Shuttle</div>
              <div className="py-2 border-b border-slate-100">Free WiFi</div>
              <div className="py-2 border-b border-slate-100">Gender Policy</div>
              <div className="py-2">Direct Contact</div>
            </div>

            {/* Hostel Columns */}
            {hostels.map(h => {
              const whatsappUrl = `https://wa.me/${h.whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
                `Hello, I am comparing hostels on HostelSearch and would like to ask about availability at ${h.name}.`
              )}`;

              return (
                <div key={h.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between">
                  <div>
                    {/* Remove button */}
                    <div className="flex justify-end mb-2">
                      <button
                        onClick={() => onRemove(h.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Image & Title */}
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3">
                      <img src={h.photos[0]} alt={h.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 
                      onClick={() => onSelectHostel(h)}
                      className="font-extrabold text-sm text-slate-900 hover:text-brand-600 cursor-pointer line-clamp-1"
                    >
                      {h.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate">{h.campusName}</p>

                    {/* Rows */}
                    <div className="mt-6 space-y-6 text-xs font-bold text-slate-800">
                      <div className="py-2 border-b border-slate-200 flex items-center gap-1 text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{h.rating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal">({h.reviewCount})</span>
                      </div>

                      <div className="py-2 border-b border-slate-200 text-brand-600 text-sm">
                        GHS {h.priceMin.toLocaleString()}
                      </div>

                      <div className="py-2 border-b border-slate-200">
                        {h.distanceKm} km ({h.walkTimeMins} mins)
                      </div>

                      <div className="py-2 border-b border-slate-200">
                        {h.isDumsorProof ? (
                          <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md text-[11px]">
                            ⚡ Generator
                          </span>
                        ) : (
                          <span className="text-slate-400 font-normal">No</span>
                        )}
                      </div>

                      <div className="py-2 border-b border-slate-200">
                        {h.hasWaterReserve ? (
                          <span className="text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-md text-[11px]">
                            💧 PolyTanks
                          </span>
                        ) : (
                          <span className="text-slate-400 font-normal">Standard</span>
                        )}
                      </div>

                      <div className="py-2 border-b border-slate-200">
                        {h.hasFreeShuttle ? (
                          <span className="text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md text-[11px]">
                            🚌 Free Shuttle
                          </span>
                        ) : (
                          <span className="text-slate-400 font-normal">None</span>
                        )}
                      </div>

                      <div className="py-2 border-b border-slate-200">
                        {h.hasFreeWifi ? (
                          <span className="text-emerald-700 font-bold">Yes</span>
                        ) : (
                          <span className="text-slate-400 font-normal">No</span>
                        )}
                      </div>

                      <div className="py-2 border-b border-slate-200 font-semibold text-slate-700">
                        {h.gender}
                      </div>

                      <div className="py-2 flex items-center gap-1.5 pt-1">
                        <a
                          href={`tel:${h.phoneNumber}`}
                          className="flex-1 p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 flex items-center justify-center"
                          title="Call"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};
