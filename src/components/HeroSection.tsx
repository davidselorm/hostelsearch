import React from 'react';
import { Sparkles, Zap, Droplets, MapPin, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
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
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-900 via-slate-900 to-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background ambient decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-brand-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -top-24 right-10 w-80 h-80 bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        
        {/* Top Campus Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider whitespace-nowrap mr-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-400" /> Top Universities:
          </span>
          {CAMPUSES.map(campus => {
            const isSelected = selectedCampus.id === campus.id;
            return (
              <button
                key={campus.id}
                onClick={() => onSelectCampus(campus)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-brand-500 text-white border-brand-400 shadow-md shadow-brand-500/30'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                }`}
              >
                {campus.shortName}
              </button>
            );
          })}
        </div>

        {/* Hero Title & Subtitle */}
        <div className="mt-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Synced with Google Maps Places API & Overpass</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight sm:leading-none text-white">
            Find Student Hostels Near <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-200 to-indigo-300">{selectedCampus.shortName}</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Browse <strong className="text-white font-bold">{totalHostelsCount} verified hostels</strong> with live Google ratings, walking distances, verified phone & WhatsApp numbers, and student reviews.
          </p>
        </div>

        {/* Key Features Badges */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Dumsor-Proof</div>
              <div className="text-[11px] text-slate-400">Generator & Solar tagged</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Water Reserves</div>
              <div className="text-[11px] text-slate-400">Polytanks & Boreholes</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Verified Pricing</div>
              <div className="text-[11px] text-slate-400">Per semester & academic year</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Google Maps Pin</div>
              <div className="text-[11px] text-slate-400">Exact GPS & Walking Mins</div>
            </div>
          </div>

        </div>

        {/* Quick Filter Shortcut Pills */}
        <div className="mt-6 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-medium">Quick Filters:</span>
          <button
            onClick={() => onQuickFilter('dumsor')}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-amber-300 border border-amber-500/30 transition-colors"
          >
            ⚡ Has Standby Generator
          </button>
          <button
            onClick={() => onQuickFilter('walking')}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-emerald-300 border border-emerald-500/30 transition-colors"
          >
            🚶 Under 15 Mins Walk
          </button>
          <button
            onClick={() => onQuickFilter('shuttle')}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-blue-300 border border-blue-500/30 transition-colors"
          >
            🚌 Free Campus Shuttle
          </button>
          <button
            onClick={() => onQuickFilter('budget')}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-purple-300 border border-purple-500/30 transition-colors"
          >
            💰 Budget (Under GHS 4,000)
          </button>
          <button
            onClick={() => onQuickFilter('single')}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-pink-300 border border-pink-500/30 transition-colors"
          >
            🛏️ 1-in-a-Room Available
          </button>
        </div>

      </div>
    </section>
  );
};
