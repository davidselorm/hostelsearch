import React from 'react';
import { Building2, MapPin, Bookmark, GitCompare, Search } from 'lucide-react';
import { Campus } from '../types/hostel';
import { CAMPUSES } from '../data/campuses';

interface NavbarProps {
  selectedCampus: Campus;
  onSelectCampus: (campus: Campus) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  bookmarkCount: number;
  compareCount: number;
  onOpenCompareModal: () => void;
  onToggleBookmarks: () => void;
  showOnlyBookmarks: boolean;
  viewMode: 'grid' | 'map' | 'split';
  onChangeViewMode: (mode: 'grid' | 'map' | 'split') => void;
  isLoadingLive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCampus,
  onSelectCampus,
  searchQuery,
  onSearchChange,
  bookmarkCount,
  compareCount,
  onOpenCompareModal,
  onToggleBookmarks,
  showOnlyBookmarks,
  viewMode,
  onChangeViewMode,
  isLoadingLive
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer shrink-0" 
            onClick={() => onSelectCampus(CAMPUSES[0])}
          >
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900">
              Hostel<span className="text-brand-600">Search</span>
            </span>
          </div>

          {/* Campus Selector */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
            <div className="flex items-center px-2 text-slate-500 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 mr-1 text-brand-600" />
              <span>Campus:</span>
            </div>
            <select
              value={selectedCampus.id}
              onChange={(e) => {
                const found = CAMPUSES.find(c => c.id === e.target.value);
                if (found) onSelectCampus(found);
              }}
              className="bg-white text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-1 border border-slate-200 shadow-sm focus:outline-none cursor-pointer"
            >
              {CAMPUSES.map(campus => (
                <option key={campus.id} value={campus.id}>
                  {campus.shortName} ({campus.city})
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-sm relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search hostel or area..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-50 focus:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors"
            />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            
            {/* Live sync indicator */}
            {isLoadingLive && (
              <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded-lg animate-pulse hidden lg:inline">
                Syncing live...
              </span>
            )}

            {/* View Mode */}
            <div className="hidden sm:flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
              <button
                onClick={() => onChangeViewMode('grid')}
                className={`px-2.5 py-1 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
              >
                Cards
              </button>
              <button
                onClick={() => onChangeViewMode('split')}
                className={`px-2.5 py-1 rounded-lg transition-all ${viewMode === 'split' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
              >
                Split
              </button>
              <button
                onClick={() => onChangeViewMode('map')}
                className={`px-2.5 py-1 rounded-lg transition-all ${viewMode === 'map' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
              >
                Map
              </button>
            </div>

            {/* Compare Button */}
            {compareCount > 0 && (
              <button
                onClick={onOpenCompareModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-brand-50 text-brand-700 border border-brand-200 hover:bg-brand-100 transition-all"
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>Compare</span>
                <span className="w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {compareCount}
                </span>
              </button>
            )}

            {/* Bookmarks Toggle */}
            <button
              onClick={onToggleBookmarks}
              className={`p-2 rounded-xl border transition-colors ${
                showOnlyBookmarks 
                  ? 'bg-rose-50 border-rose-300 text-rose-600' 
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title={showOnlyBookmarks ? 'Show all hostels' : 'View saved hostels'}
            >
              <Bookmark className={`w-4 h-4 ${showOnlyBookmarks ? 'fill-rose-500' : ''}`} />
            </button>

          </div>
        </div>

        {/* Mobile Subheader */}
        <div className="sm:hidden pb-3 pt-1 flex items-center gap-2">
          <select
            value={selectedCampus.id}
            onChange={(e) => {
              const found = CAMPUSES.find(c => c.id === e.target.value);
              if (found) onSelectCampus(found);
            }}
            className="flex-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-1.5 border border-slate-200"
          >
            {CAMPUSES.map(campus => (
              <option key={campus.id} value={campus.id}>
                {campus.shortName}
              </option>
            ))}
          </select>
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600">
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

      </div>
    </header>
  );
};
