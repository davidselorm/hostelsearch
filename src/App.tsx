import React, { useState, useMemo, useEffect } from 'react';
import { 
  Building2, MapPin, Sparkles, Filter, Bookmark, RefreshCw, 
  GitCompare, PlusCircle, Search, SlidersHorizontal, CheckCircle2 
} from 'lucide-react';
import { Hostel, Campus, FilterState, RoomCapacityType } from './types/hostel';
import { CAMPUSES } from './data/campuses';
import { 
  getAllHostels, 
  mergeImportedHostels, 
  addHostelReview, 
  getBookmarkedIds, 
  toggleBookmarkId 
} from './services/hostelStorage';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FilterSidebar } from './components/FilterSidebar';
import { HostelCard } from './components/HostelCard';
import { HostelModal } from './components/HostelModal';
import { HostelMap } from './components/HostelMap';
import { GoogleMapsSyncModal } from './components/GoogleMapsSyncModal';
import { CompareModal } from './components/CompareModal';
import { AddHostelModal } from './components/AddHostelModal';

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
  
  // Modals state
  const [activeModalHostel, setActiveModalHostel] = useState<Hostel | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  
  // View mode
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'split'>('grid');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load initial data
  useEffect(() => {
    setHostels(getAllHostels());
    setBookmarkedIds(getBookmarkedIds());
  }, []);

  // Update campus filter when selectedCampus changes
  const handleSelectCampus = (campus: Campus) => {
    setSelectedCampus(campus);
    setFilters(prev => ({
      ...prev,
      campusId: campus.id
    }));
  };

  // Filter change helper
  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      ...INITIAL_FILTERS,
      campusId: selectedCampus.id
    });
    setShowOnlyBookmarks(false);
    showToast('Filters reset to default.');
  };

  // Bookmark toggle
  const handleToggleBookmark = (id: string) => {
    const isBookmarked = toggleBookmarkId(id);
    setBookmarkedIds(getBookmarkedIds());
    showToast(isBookmarked ? 'Hostel added to bookmarks!' : 'Hostel removed from bookmarks.');
  };

  // Compare toggle
  const handleToggleCompare = (hostel: Hostel) => {
    const exists = comparedHostels.some(h => h.id === hostel.id);
    if (exists) {
      setComparedHostels(prev => prev.filter(h => h.id !== hostel.id));
      showToast(`Removed ${hostel.name} from comparison.`);
    } else {
      if (comparedHostels.length >= 3) {
        showToast('You can compare up to 3 hostels at a time.');
        return;
      }
      setComparedHostels(prev => [...prev, hostel]);
      showToast(`Added ${hostel.name} to comparison!`);
    }
  };

  // Add Review
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
      showToast('Review submitted successfully!');
    }
  };

  // Import from Google Maps
  const handleImportComplete = (imported: Hostel[]) => {
    const res = mergeImportedHostels(imported);
    setHostels(getAllHostels());
    showToast(`Successfully synced ${res.added} new hostels from Google Maps!`);
  };

  // Add new custom hostel
  const handleAddHostel = (newHostel: Hostel) => {
    const updated = [newHostel, ...hostels];
    setHostels(updated);
    mergeImportedHostels([newHostel]);
    showToast(`Hostel "${newHostel.name}" published successfully!`);
  };

  // Quick filters from Hero section
  const handleQuickFilter = (key: string) => {
    if (key === 'dumsor') {
      handleFilterChange({ amenities: ['generator'] });
    } else if (key === 'walking') {
      handleFilterChange({ maxDistanceKm: 1.2 });
    } else if (key === 'shuttle') {
      handleFilterChange({ amenities: ['shuttle'] });
    } else if (key === 'budget') {
      handleFilterChange({ maxPrice: 4000 });
    } else if (key === 'single') {
      handleFilterChange({ roomTypes: ['1-in-a-room'] });
    }
    showToast(`Applied quick filter: ${key}`);
  };

  // Filtered & Sorted Hostels
  const filteredHostels = useMemo(() => {
    return hostels.filter(h => {
      // Campus filter
      if (filters.campusId !== 'all' && h.campusId !== filters.campusId) {
        return false;
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = h.name.toLowerCase().includes(q);
        const matchesArea = h.area.toLowerCase().includes(q);
        const matchesAddress = h.address.toLowerCase().includes(q);
        const matchesCampus = h.campusName.toLowerCase().includes(q);
        if (!matchesName && !matchesArea && !matchesAddress && !matchesCampus) {
          return false;
        }
      }

      // Max Price
      if (h.priceMin > filters.maxPrice) {
        return false;
      }

      // Room Types
      if (filters.roomTypes.length > 0) {
        const hasMatchingRoom = h.rooms.some(r => filters.roomTypes.includes(r.type) && r.available);
        if (!hasMatchingRoom) return false;
      }

      // Gender
      if (filters.gender !== 'all' && h.gender !== filters.gender) {
        return false;
      }

      // Rating
      if (filters.minRating > 0 && h.rating < filters.minRating) {
        return false;
      }

      // Distance
      if (filters.maxDistanceKm < 10 && h.distanceKm > filters.maxDistanceKm) {
        return false;
      }

      // Amenities
      if (filters.amenities.includes('generator') && !h.isDumsorProof) return false;
      if (filters.amenities.includes('water') && !h.hasWaterReserve) return false;
      if (filters.amenities.includes('wifi') && !h.hasFreeWifi) return false;
      if (filters.amenities.includes('shuttle') && !h.hasFreeShuttle) return false;

      // Bookmarks only
      if (showOnlyBookmarks && !bookmarkedIds.includes(h.id)) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'recommended') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'price_asc') {
        return a.priceMin - b.priceMin;
      }
      if (filters.sortBy === 'price_desc') {
        return b.priceMin - a.priceMin;
      }
      if (filters.sortBy === 'distance') {
        return a.distanceKm - b.distanceKm;
      }
      return 0;
    });
  }, [hostels, filters, showOnlyBookmarks, bookmarkedIds]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-800 animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        selectedCampus={selectedCampus}
        onSelectCampus={handleSelectCampus}
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
        bookmarkCount={bookmarkedIds.length}
        compareCount={comparedHostels.length}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenBookmarks={() => setShowOnlyBookmarks(prev => !prev)}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
      />

      {/* Hero Section */}
      <HeroSection
        selectedCampus={selectedCampus}
        onSelectCampus={handleSelectCampus}
        totalHostelsCount={hostels.length}
        onQuickFilter={handleQuickFilter}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Results Info & Active Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {showOnlyBookmarks ? 'Your Bookmarked Hostels' : `Hostels near ${selectedCampus.shortName}`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Showing <span className="font-bold text-slate-800">{filteredHostels.length}</span> hostels verified from Google Maps places
            </p>
          </div>

          <div className="flex items-center gap-2">
            {showOnlyBookmarks && (
              <button
                onClick={() => setShowOnlyBookmarks(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-300"
              >
                Clear Bookmarks Filter
              </button>
            )}

            <button
              onClick={() => setIsSyncModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Fetch More Hostels</span>
            </button>
          </div>
        </div>

        {/* View Layouts */}
        {viewMode === 'map' ? (
          /* Full Map View */
          <div className="space-y-4">
            <HostelMap
              campuses={CAMPUSES}
              selectedCampus={selectedCampus}
              hostels={filteredHostels}
              onSelectHostel={setActiveModalHostel}
              heightClass="h-[750px]"
            />
          </div>
        ) : viewMode === 'split' ? (
          /* Split View: Left List, Right Map */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 hidden lg:block">
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                matchingCount={filteredHostels.length}
              />
            </div>
            
            <div className="lg:col-span-4 space-y-4 max-h-[850px] overflow-y-auto pr-2 no-scrollbar">
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

            <div className="lg:col-span-4 sticky top-24">
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
          /* Standard Grid View with Sidebar */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Column */}
            <div className="lg:col-span-3">
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                matchingCount={filteredHostels.length}
              />
            </div>

            {/* Hostel Cards Grid */}
            <div className="lg:col-span-9">
              {filteredHostels.length === 0 ? (
                /* Empty state */
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto my-12">
                  <div className="w-16 h-16 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No Hostels Match Your Criteria</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Try adjusting your budget range, room types, or distance settings. You can also scan Google Maps directly to discover more student accommodations in this area!
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2">
                    <button
                      onClick={handleResetFilters}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Reset All Filters
                    </button>
                    <button
                      onClick={() => setIsSyncModalOpen(true)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20"
                    >
                      Scan Google Maps Now
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-lg tracking-tight">Hostel<span className="text-brand-400">Search</span></span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                The premier student housing and hostel search engine in Ghana, directly integrated with Google Maps Places data, genuine reviews, and real pricing.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Popular Campuses</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                {CAMPUSES.filter(c => c.id !== 'all').map(c => (
                  <li key={c.id}>
                    <button onClick={() => handleSelectCampus(c)} className="hover:text-brand-400 transition-colors">
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Student Essentials</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>⚡ Dumsor-Proof Generator Hostels</li>
                <li>💧 Hostels with Borehole Water Tanks</li>
                <li>🚌 Free Campus Shuttle Accommodations</li>
                <li>🛏️ 1-in-a-Room Executive Rooms</li>
                <li>🔒 Verified Female Only Hostels</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Hostel Managers</h4>
              <p className="text-xs text-slate-400 mb-3">
                Own or manage a student hostel? Get listed and receive direct WhatsApp bookings from students.
              </p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-xs text-white shadow-md transition-colors"
              >
                List Your Hostel For Free
              </button>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} HostelSearch Ghana. Powered by Google Maps Places API & OpenStreetMap.</p>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Student Support</span>
            </div>
          </div>
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

      {isSyncModalOpen && (
        <GoogleMapsSyncModal
          currentCampus={selectedCampus}
          onClose={() => setIsSyncModalOpen(false)}
          onImportComplete={handleImportComplete}
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

      {isAddModalOpen && (
        <AddHostelModal
          onClose={() => setIsAddModalOpen(false)}
          onAddHostel={handleAddHostel}
          currentCampus={selectedCampus}
        />
      )}

    </div>
  );
};
