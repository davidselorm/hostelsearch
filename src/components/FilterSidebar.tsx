import React from 'react';
import { Filter, RotateCcw, DollarSign, Bed, Users, Star, Compass, Zap, Droplets, Wifi, Bus, ShieldCheck } from 'lucide-react';
import { FilterState, RoomCapacityType, GenderPolicy } from '../types/hostel';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  matchingCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  matchingCount
}) => {
  const roomTypeOptions: { id: RoomCapacityType; label: string }[] = [
    { id: '1-in-a-room', label: '1-in-a-Room (Single)' },
    { id: '2-in-a-room', label: '2-in-a-Room (Double)' },
    { id: '3-in-a-room', label: '3-in-a-Room (Triple)' },
    { id: '4-in-a-room', label: '4-in-a-Room (Quad)' }
  ];

  const amenityOptions = [
    { id: 'generator', label: 'Standby Generator', icon: Zap },
    { id: 'water', label: 'Water Reservoir Tank', icon: Droplets },
    { id: 'wifi', label: 'High-Speed WiFi', icon: Wifi },
    { id: 'shuttle', label: 'Free Campus Shuttle', icon: Bus },
    { id: 'security', label: '24/7 Security & CCTV', icon: ShieldCheck }
  ];

  const toggleRoomType = (type: RoomCapacityType) => {
    const exists = filters.roomTypes.includes(type);
    const updated = exists
      ? filters.roomTypes.filter(t => t !== type)
      : [...filters.roomTypes, type];
    onChange({ roomTypes: updated });
  };

  const toggleAmenity = (amenityId: string) => {
    const exists = filters.amenities.includes(amenityId);
    const updated = exists
      ? filters.amenities.filter(a => a !== amenityId)
      : [...filters.amenities, amenityId];
    onChange({ amenities: updated });
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm sticky top-24 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Filter Hostels</h3>
            <p className="text-xs text-slate-500">{matchingCount} matching results</p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
          title="Reset all filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Sort Results By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ sortBy: e.target.value as any })}
          className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="recommended">⭐ Highest Rated First</option>
          <option value="price_asc">💵 Price: Lowest to Highest</option>
          <option value="price_desc">💎 Price: Highest to Lowest</option>
          <option value="distance">🚶 Closest to Campus Gate</option>
        </select>
      </div>

      {/* Max Budget Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-brand-600" /> Max Budget / Sem
          </label>
          <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-lg border border-brand-100">
            GHS {filters.maxPrice.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="2000"
          max="12000"
          step="500"
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
          <span>GHS 2,000</span>
          <span>GHS 7,000</span>
          <span>GHS 12,000+</span>
        </div>
      </div>

      {/* Room Types */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Bed className="w-3.5 h-3.5 text-brand-600" /> Room Capacity
        </label>
        <div className="space-y-2">
          {roomTypeOptions.map(room => {
            const checked = filters.roomTypes.includes(room.id);
            return (
              <label
                key={room.id}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all border ${
                  checked ? 'bg-brand-50/70 border-brand-300 text-brand-900 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleRoomType(room.id)}
                    className="rounded text-brand-600 focus:ring-brand-500 w-3.5 h-3.5"
                  />
                  <span>{room.label}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Distance to Campus */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-brand-600" /> Max Distance
          </label>
          <span className="text-xs font-bold text-slate-700">
            {filters.maxDistanceKm >= 10 ? 'Any distance' : `< ${filters.maxDistanceKm} km`}
          </span>
        </div>
        <input
          type="range"
          min="0.5"
          max="10"
          step="0.5"
          value={filters.maxDistanceKm}
          onChange={(e) => onChange({ maxDistanceKm: Number(e.target.value) })}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>0.5 km (Walk)</span>
          <span>3 km</span>
          <span>10 km+</span>
        </div>
      </div>

      {/* Gender Policy */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-brand-600" /> Gender Policy
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {(['all', 'Co-ed', 'Female Only', 'Male Only'] as const).map(option => (
            <button
              key={option}
              onClick={() => onChange({ gender: option })}
              className={`py-1.5 px-2 text-center rounded-lg text-xs font-semibold transition-all border ${
                filters.gender === option
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {option === 'all' ? 'All' : option}
            </button>
          ))}
        </div>
      </div>

      {/* Critical Ghanaian Amenities */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
          Essential Student Amenities
        </label>
        <div className="space-y-1.5">
          {amenityOptions.map(am => {
            const checked = filters.amenities.includes(am.id);
            const Icon = am.icon;
            return (
              <label
                key={am.id}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all border ${
                  checked ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAmenity(am.id)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                />
                <Icon className={`w-3.5 h-3.5 ${checked ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{am.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Google Rating
        </label>
        <div className="flex gap-2">
          {[0, 4.0, 4.5].map(rating => (
            <button
              key={rating}
              onClick={() => onChange({ minRating: rating })}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                filters.minRating === rating
                  ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {rating === 0 ? 'Any' : `${rating}+ ★`}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
