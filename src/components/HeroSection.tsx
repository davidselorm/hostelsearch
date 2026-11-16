import React from 'react';
import { MapPin, Zap, Footprints, Bus, Coins, Bed } from 'lucide-react';
import { Campus } from '../types/hostel';
import { CAMPUSES } from '../data/campuses';

interface HeroSectionProps {
  selectedCampus: Campus;
  onSelectCampus: (c: Campus) => void;
  totalHostelsCount: number;
  onQuickFilter: (key: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedCampus,
  onSelectCampus,
  totalHostelsCount,
  onQuickFilter
}) => {
  return (
    <section className="bg-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Campus selector chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 no-scrollbar">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mr-2 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-400" /> Campuses:
          </span>
          {CAMPUSES.map(campus => {
            const isSelected = selectedCampus.id === campus.id;
            return (
              <button
                key={campus.id}
                onClick={() => onSelectCampus(campus)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-brand-600 text-white border-brand-500'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {campus.shortName}
              </button>
            );
          })}
        </div>

        {/* Clean, short headline */}
        <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Hostels near {selectedCampus.shortName}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              {totalHostelsCount} verified student accommodations with live Google Maps data
            </p>
          </div>

          {/* Quick filter shortcut pills with standard Lucide icons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => onQuickFilter('dumsor')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Standby Generator</span>
            </button>

            <button
              onClick={() => onQuickFilter('walking')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-colors"
            >
              <Footprints className="w-3.5 h-3.5 text-emerald-400" />
              <span>&lt; 15 Mins Walk</span>
            </button>

            <button
              onClick={() => onQuickFilter('shuttle')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 transition-colors"
            >
              <Bus className="w-3.5 h-3.5 text-blue-400" />
              <span>Campus Shuttle</span>
            </button>

            <button
              onClick={() => onQuickFilter('single')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-purple-400 border border-slate-700 transition-colors"
            >
              <Bed className="w-3.5 h-3.5 text-purple-400" />
              <span>Single Rooms</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
