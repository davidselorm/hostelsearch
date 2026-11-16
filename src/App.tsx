import React, { useState, useMemo, useEffect } from 'react';
import { Building2, MapPin, Filter, Bookmark, GitCompare, RefreshCw } from 'lucide-react';
import { Hostel, Campus, FilterState } from './types/hostel';
import { CAMPUSES } from './data/campuses';
import { 
  getAllHostels, 
  mergeImportedHostels, 
  addHostelReview, 
  getBookmarkedIds, 
  toggleBookmarkId 
} from './services/hostelStorage';
import { autoFetchHostels } from './services/googleMapsService';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FilterSidebar } from './components/FilterSidebar';
import { HostelCard } from './components/HostelCard';
import { HostelModal } from './components/HostelModal';
import { HostelMap } from './components/HostelMap';
import { CompareModal } from './components/CompareModal';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  campusId: 'all',
  maxPrice: 12000,
  roomTypes: [],
  amenities: [],
  gender: 'all',
  minRating: 0,
  maxDistanceKm: 10,
  sortBy: 'recommended'
};

export const App: React.FC = () => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<Campus>(CAMPUSES[0]);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [comparedHostels, setComparedHostels] = useState<Hostel[]>([]);
  
  // Modals
  const [activeModalHostel, setActiveModalHostel] = useState<Hostel | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  
  // View mode
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'split'>('grid');

  // Load initial data
  useEffect(() => {
    setHostels(getAllHostels());
    setBookmarkedIds(getBookmarkedIds());
  }, []);

  // Automatic background live sync whenever selected campus changes
  useEffect(() => {
    let isCancelled = false;

    const performAutoSync = async () => {
      if (selectedCampus.id === 'all') return;
      setIsLoadingLive(true);
      try {
        const liveResults = await autoFetchHostels(selectedCampus);
        if (!isCancelled && liveResults.length > 0) {
          mergeImportedHostels(liveResults);
          setHostels(getAllHostels());
        }
      } catch (err) {
        console.warn('Background spatial sync notice:', err);
      } finally {
        if (!isCancelled) setIsLoadingLive(false);
      }
    };

    performAutoSync();

    return () => {
      isCancelled = true;
    };
  }, [selectedCampus]);

  // Campus selection
  const handleSelectCampus = (campus: Campus) => {
    setSelectedCampus(campus);
    setFilters(prev => ({
      ...prev,
      campusId: campus.id
    }));
  };

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      ...INITIAL_FILTERS,
      campusId: selectedCampus.id
    });
    setShowOnlyBookmarks(false);
  };

  // Bookmark toggle
  const handleToggleBookmark = (id: string) => {
    toggleBookmarkId(id);
    setBookmarkedIds(getBookmarkedIds());
  };

  // Compare toggle
  const handleToggleCompare = (hostel: Hostel) => {
    const exists = comparedHostels.some(h => h.id === hostel.id);
    if (exists) {
      setComparedHostels(prev => prev.filter(h => h.id !== hostel.id));
    } else {
      if (comparedHostels.length >= 3) return;
      setComparedHostels(prev => [...prev, hostel]);
    }
  };

  // Review
  const handleAddReview = (hostelId: string, author: string, rating: number, text: string) => {
    const updated = addHostelReview(hostelId, {
      authorName: author,
      rating,
      relativeTimeDescription: 'Just now',
      text
    });
    if (updated) {
      setHostels(getAllHostels());
      setActiveModalHostel(updated);
    }
  };

  // Quick filters
  const handleQuickFilter = (key: string) => {
    if (key === 'dumsor') {
      handleFilterChange({ amenities: ['generator'] });
    } else if (key === 'walking') {
      handleFilterChange({ maxDistanceKm: 1.2 });
    } else if (key === 'shuttle') {
      handleFilterChange({ amenities: ['shuttle'] });
    } else if (key === 'single') {
      handleFilterChange({ roomTypes: ['1-in-a-room'] });
    }
  };

  // Filtered Hostels
  const filteredHostels = useMemo(() => {
    return hostels.filter(h => {
      if (filters.campusId !== 'all' && h.campusId !== filters.campusId) {
        return false;
      }

      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = h.name.toLowerCase().includes(q);
        const matchesArea = h.area.toLowerCase().includes(q);
        const matchesAddress = h.address.toLowerCase().includes(q);
        if (!matchesName && !matchesArea && !matchesAddress) return false;
      }

      if (h.priceMin > filters.maxPrice) return false;

      if (filters.roomTypes.length > 0) {
        const hasMatchingRoom = h.rooms.some(r => filters.roomTypes.includes(r.type) && r.available);
        if (!hasMatchingRoom) return false;
      }

      if (filters.gender !== 'all' && h.gender !== filters.gender) return false;
      if (filters.minRating > 0 && h.rating < filters.minRating) return false;
      if (filters.maxDistanceKm < 10 && h.distanceKm > filters.maxDistanceKm) return false;

      if (filters.amenities.includes('generator') && !h.isDumsorProof) return false;
      if (filters.amenities.includes('water') && !h.hasWaterReserve) return false;
      if (filters.amenities.includes('wifi') && !h.hasFreeWifi) return false;
      if (filters.amenities.includes('shuttle') && !h.hasFreeShuttle) return false;

      if (showOnlyBookmarks && !bookmarkedIds.includes(h.id)) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'recommended') return b.rating - a.rating;
      if (filters.sortBy === 'price_asc') return a.priceMin - b.priceMin;
      if (filters.sortBy === 'price_desc') return b.priceMin - a.priceMin;
      if (filters.sortBy === 'distance') return a.distanceKm - b.distanceKm;
      return 0;
    });
  }, [hostels, filters, showOnlyBookmarks, bookmarkedIds]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Navbar */}
      <Navbar
        selectedCampus={selectedCampus}
        onSelectCampus={handleSelectCampus}
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
        bookmarkCount={bookmarkedIds.length}
        compareCount={comparedHostels.length}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
        onToggleBookmarks={() => setShowOnlyBookmarks(prev => !prev)}
        showOnlyBookmarks={showOnlyBookmarks}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        isLoadingLive={isLoadingLive}
      />

      {/* Hero */}
      <HeroSection
        selectedCampus={selectedCampus}
        onSelectCampus={handleSelectCampus}
        totalHostelsCount={hostels.length}
        onQuickFilter={handleQuickFilter}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        
        {/* Subheader */}
        <div className="flex items-center justify-between pb-4">
          <div className="text-xs sm:text-sm font-semibold text-slate-700">
            {showOnlyBookmarks ? 'Saved Hostels' : `${filteredHostels.length} hostels found`}
          </div>
          {showOnlyBookmarks && (
            <button
              onClick={() => setShowOnlyBookmarks(false)}
              className="text-xs text-brand-600 font-semibold hover:underline"
            >
              Show all hostels
            </button>
          )}
        </div>

        {/* View Layouts */}
        {viewMode === 'map' ? (
          <HostelMap
            campuses={CAMPUSES}
            selectedCampus={selectedCampus}
            hostels={filteredHostels}
            onSelectHostel={setActiveModalHostel}
            heightClass="h-[750px]"
          />
        ) : viewMode === 'split' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 hidden lg:block">
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                matchingCount={filteredHostels.length}
              />
            </div>
            
            <div className="lg:col-span-4 space-y-4 max-h-[800px] overflow-y-auto pr-1 no-scrollbar">
              {filteredHostels.map(hostel => (
                <HostelCard
                  key={hostel.id}
                  hostel={hostel}
                  isBookmarked={bookmarkedIds.includes(hostel.id)}
                  onToggleBookmark={handleToggleBookmark}
                  isCompared={comparedHostels.some(h => h.id === hostel.id)}
                  onToggleCompare={handleToggleCompare}
                  onSelect={setActiveModalHostel}
                />
              ))}
            </div>

            <div className="lg:col-span-4 sticky top-20">
              <HostelMap
                campuses={CAMPUSES}
                selectedCampus={selectedCampus}
                hostels={filteredHostels}
                onSelectHostel={setActiveModalHostel}
                heightClass="h-[650px]"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-3">
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                matchingCount={filteredHostels.length}
              />
            </div>

            <div className="lg:col-span-9">
              {filteredHostels.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 max-w-sm mx-auto my-8">
                  <Building2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <h3 className="text-sm font-bold text-slate-800">No matching hostels</h3>
                  <p className="text-xs text-slate-500 mt-1">Try resetting your filters</p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredHostels.map(hostel => (
                    <HostelCard
                      key={hostel.id}
                      hostel={hostel}
                      isBookmarked={bookmarkedIds.includes(hostel.id)}
                      onToggleBookmark={handleToggleBookmark}
                      isCompared={comparedHostels.some(h => h.id === hostel.id)}
                      onToggleCompare={handleToggleCompare}
                      onSelect={setActiveModalHostel}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Simple, uncrowded footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-brand-600" />
            <span className="font-bold text-slate-800">HostelSearch</span>
            <span>• Verified student accommodation directory</span>
          </div>
          <div>Powered by Google Maps & OpenStreetMap data</div>
        </div>
      </footer>

      {/* Modals */}
      {activeModalHostel && (
        <HostelModal
          hostel={activeModalHostel}
          onClose={() => setActiveModalHostel(null)}
          onAddReview={handleAddReview}
        />
      )}

      {isCompareModalOpen && (
        <CompareModal
          hostels={comparedHostels}
          onClose={() => setIsCompareModalOpen(false)}
          onRemove={(id) => setComparedHostels(prev => prev.filter(h => h.id !== id))}
          onSelectHostel={setActiveModalHostel}
        />
      )}

    </div>
  );
};
