import React from 'react';
import { X, Star, Zap, Droplets, Wifi, Bus, Phone, MessageCircle } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col my-auto border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Compare Hostels</h2>
            <p className="text-xs text-slate-500">{hostels.length} hostels selected</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table */}
        <div className="p-4 overflow-x-auto">
          <div className="min-w-[600px] grid grid-cols-4 gap-3 text-xs">
            
            <div className="space-y-4 pt-36 font-semibold text-slate-500">
              <div className="py-1.5 border-b border-slate-100">Rating</div>
              <div className="py-1.5 border-b border-slate-100">Price / Sem</div>
              <div className="py-1.5 border-b border-slate-100">Distance</div>
              <div className="py-1.5 border-b border-slate-100">Generator</div>
              <div className="py-1.5 border-b border-slate-100">Water Tank</div>
              <div className="py-1.5 border-b border-slate-100">Shuttle</div>
              <div className="py-1.5 border-b border-slate-100">WiFi</div>
              <div className="py-1.5">Gender</div>
            </div>

            {hostels.map(h => {
              const hasPhone = Boolean(h.phoneNumber && h.phoneNumber.trim().length > 5);
              return (
                <div key={h.id} className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <div className="flex justify-end mb-1">
                    <button
                      onClick={() => onRemove(h.id)}
                      className="text-slate-400 hover:text-rose-500 p-0.5"
                      title="Remove"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="aspect-[16/10] rounded-lg overflow-hidden mb-2">
                    <img src={h.photos[0]} alt={h.name} className="w-full h-full object-cover" />
                  </div>

                  <h3 
                    onClick={() => onSelectHostel(h)}
                    className="font-bold text-xs text-slate-900 hover:text-brand-600 cursor-pointer truncate"
                  >
                    {h.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 truncate">{h.campusName}</p>

                  <div className="mt-4 space-y-4 font-bold text-slate-800">
                    <div className="py-1.5 border-b border-slate-200 flex items-center gap-1 text-amber-600">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{h.rating.toFixed(1)}</span>
                    </div>

                    <div className="py-1.5 border-b border-slate-200 text-brand-600">
                      GHS {h.priceMin.toLocaleString()}
                    </div>

                    <div className="py-1.5 border-b border-slate-200 font-normal">
                      {h.distanceKm} km
                    </div>

                    <div className="py-1.5 border-b border-slate-200">
                      {h.isDumsorProof ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Zap className="w-3 h-3" /> Yes
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal">No</span>
                      )}
                    </div>

                    <div className="py-1.5 border-b border-slate-200">
                      {h.hasWaterReserve ? (
                        <span className="text-cyan-700 font-semibold flex items-center gap-1">
                          <Droplets className="w-3 h-3" /> Yes
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal">No</span>
                      )}
                    </div>

                    <div className="py-1.5 border-b border-slate-200">
                      {h.hasFreeShuttle ? (
                        <span className="text-blue-700 font-semibold flex items-center gap-1">
                          <Bus className="w-3 h-3" /> Yes
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal">No</span>
                      )}
                    </div>

                    <div className="py-1.5 border-b border-slate-200 font-semibold">
                      {h.hasFreeWifi ? 'Yes' : 'No'}
                    </div>

                    <div className="py-1.5 font-normal text-slate-700">
                      {h.gender}
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
