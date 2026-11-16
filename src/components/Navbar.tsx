import React from 'react';
import { Building2, MapPin, Sparkles, Bookmark, GitCompare, RefreshCw, PlusCircle, Search } from 'lucide-react';
import { Campus } from '../types/hostel';
import { CAMPUSES } from '../data/campuses';

interface NavbarProps {
  selectedCampus: Campus;
  onSelectCampus: (campus: Campus) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  bookmarkCount: number;
  compareCount: number;
  onOpenSyncModal: () => void;
  onOpenCompareModal: () => void;
  onOpenAddModal: () => void;
  onOpenBookmarks: () => void;
  viewMode: 'grid' | 'map' | 'split';
  onChangeViewMode: (mode: 'grid' | 'map' | 'split') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCampus,
  onSelectCampus,
  searchQuery,
  onSearchChange,
  bookmarkCount,
  compareCount,
  onOpenSyncModal,
  onOpenCompareModal,
  onOpenAddModal,
  onOpenBookmarks,
  viewMode,
  onChangeViewMode
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectCampus(CAMPUSES[0])}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">Hostel<span className="text-brand-600">Search</span></span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-700 px-1.5 py-0.5 rounded border border-brand-200">Maps Pro</span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Find student hostels easily with Google Maps data</p>
            </div>
          </div>

          {/* Campus Selector Dropdown */}
          <div className="hidden md:flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
            <div className="flex items-center px-2.5 text-slate-500 text-sm">
              <MapPin className="w-4 h-4 mr-1.5 text-brand-600" />
              <span>Campus:</span>
            </div>
            <select
              value={selectedCampus.id}
              onChange={(e) => {
                const found = CAMPUSES.find(c => c.id === e.target.value);
                if (found) onSelectCampus(found);
              }}
              className="bg-white text-slate-800 text-sm font-semibold rounded-lg px-3 py-1.5 border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              {CAMPUSES.map(campus => (
                <option key={campus.id} value={campus.id}>
                  {campus.shortName} ({campus.city})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Search */}
          <div className="flex-1 max-w-xs relative hidden lg:block">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search hostel name, area, or road..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 hover:bg-slate-50 focus:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
            />
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* View Mode Switcher */}
            <div className="hidden sm:flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
              <button
                onClick={() => onChangeViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
              >
                Cards
              </button>
              <button
                onClick={() => onChangeViewMode('split')}
                className={`px-3 py-1.5 rounded-lg transition-all ${viewMode === 'split' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
              >
                Split
              </button>
              <button
                onClick={() => onChangeViewMode('map')}
                className={`px-3 py-1.5 rounded-lg transition-all ${viewMode === 'map' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
              >
                Map
              </button>
            </div>

            {/* Sync with Google Maps Button */}
            <button
              onClick={onOpenSyncModal}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm hover:from-emerald-700 hover:to-teal-700 transition-all active:scale-95"
              title="Sync live hostels directly from Google Maps"
            >
              <RefreshCw className="w-4 h-4 animate-spin-hover" />
              <span className="hidden xs:inline">Sync Maps</span>
              <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] bg-white/20 rounded font-bold">
                Live
              </span>
            </button>

            {/* Compare Button */}
            {compareCount > 0 && (
              <button
                onClick={onOpenCompareModal}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-brand-50 text-brand-700 border border-brand-200 hover:bg-brand-100 transition-all active:scale-95"
              >
                <GitCompare className="w-4 h-4" />
                <span className="hidden md:inline">Compare</span>
                <span className="w-5 h-5 rounded-full bg-brand-600 text-white text-[11px] flex items-center justify-center font-bold">
                  {compareCount}
                </span>
              </button>
            )}

            {/* Bookmarks */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              title="Saved Hostels"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* List Your Hostel */}
            <button
              onClick={onOpenAddModal}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all active:scale-95 shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>List Hostel</span>
            </button>

          </div>
        </div>

        {/* Mobile Campus Selector & Search Bar */}
        <div className="md:hidden pb-3 pt-1 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <select
              value={selectedCampus.id}
              onChange={(e) => {
                const found = CAMPUSES.find(c => c.id === e.target.value);
                if (found) onSelectCampus(found);
              }}
              className="flex-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-2 border border-slate-200"
            >
              {CAMPUSES.map(campus => (
                <option key={campus.id} value={campus.id}>
                  {campus.shortName} ({campus.city})
                </option>
              ))}
            </select>
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-600">
              <button
                onClick={() => onChangeViewMode('grid')}
                className={`px-2 py-1 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-slate-900' : ''}`}
              >
                Cards
              </button>
              <button
                onClick={() => onChangeViewMode('map')}
                className={`px-2 py-1 rounded ${viewMode === 'map' ? 'bg-white shadow-sm text-slate-900' : ''}`}
              >
                Map
              </button>
            </div>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search hostel name or area..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

      </div>
    </header>
  );
};
