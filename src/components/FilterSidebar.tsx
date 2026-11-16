import React from 'react';
import { Filter, RotateCcw, DollarSign, Bed, Compass, Star, Zap, Droplets, Wifi, Bus, ShieldCheck } from 'lucide-react';
import { FilterState, RoomCapacityType } from '../types/hostel';

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
    { id: '1-in-a-room', label: '1 in a Room' },
    { id: '2-in-a-room', label: '2 in a Room' },
    { id: '3-in-a-room', label: '3 in a Room' },
    { id: '4-in-a-room', label: '4 in a Room' }
  ];

  const amenityOptions = [
    { id: 'generator', label: 'Standby Generator', icon: Zap },
    { id: 'water', label: 'Water Reservoir', icon: Droplets },
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'shuttle', label: 'Campus Shuttle', icon: Bus },
    { id: 'security', label: '24/7 Security', icon: ShieldCheck }
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
    <div className="bg-white rounded-2xl p-4 border border-slate-200 sticky top-20 space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-brand-600" />
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Filters ({matchingCount})</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-brand-600 flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ sortBy: e.target.value as any })}
          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-800 focus:outline-none"
        >
          <option value="recommended">Highest Rating</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="distance">Nearest to Campus</option>
        </select>
      </div>

      {/* Max Budget */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
            Max Price / Sem
          </label>
          <span className="text-xs font-bold text-brand-600">
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
          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
        />
      </div>

      {/* Room Types */}
      <div>
        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
          Room Capacity
        </label>
        <div className="space-y-1.5">
          {roomTypeOptions.map(room => {
            const checked = filters.roomTypes.includes(room.id);
            return (
              <label
                key={room.id}
                className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleRoomType(room.id)}
                  className="rounded text-brand-600 w-3.5 h-3.5"
                />
                <span>{room.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
          Amenities
        </label>
        <div className="space-y-1.5">
          {amenityOptions.map(am => {
            const checked = filters.amenities.includes(am.id);
            const Icon = am.icon;
            return (
              <label
                key={am.id}
                className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAmenity(am.id)}
                  className="rounded text-brand-600 w-3.5 h-3.5"
                />
                <Icon className="w-3.5 h-3.5 text-slate-400" />
                <span>{am.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
          Min Rating
        </label>
        <div className="flex gap-1.5">
          {[0, 4.0, 4.5].map(rating => (
            <button
              key={rating}
              onClick={() => onChange({ minRating: rating })}
              className={`flex-1 py-1 rounded-lg text-xs font-bold border ${
                filters.minRating === rating
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {rating === 0 ? 'All' : `${rating}+`}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
