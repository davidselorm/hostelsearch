import React, { useState } from 'react';
import { X, Plus, Building2, MapPin, Phone, MessageCircle, DollarSign, ShieldCheck, Check } from 'lucide-react';
import { Hostel, GenderPolicy, Campus } from '../types/hostel';
import { CAMPUSES } from '../data/campuses';

interface AddHostelModalProps {
  onClose: () => void;
  onAddHostel: (hostel: Hostel) => void;
  currentCampus: Campus;
}

export const AddHostelModal: React.FC<AddHostelModalProps> = ({
  onClose,
  onAddHostel,
  currentCampus
}) => {
  const [name, setName] = useState('');
  const [campusId, setCampusId] = useState(currentCampus.id === 'all' ? 'ug-legon' : currentCampus.id);
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [priceMin, setPriceMin] = useState(3000);
  const [priceMax, setPriceMax] = useState(7000);
  const [gender, setGender] = useState<GenderPolicy>('Co-ed');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

  // Amenities
  const [isDumsorProof, setIsDumsorProof] = useState(true);
  const [hasWaterReserve, setHasWaterReserve] = useState(true);
  const [hasFreeShuttle, setHasFreeShuttle] = useState(false);
  const [hasFreeWifi, setHasFreeWifi] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phoneNumber.trim()) return;

    const matchedCampus = CAMPUSES.find(c => c.id === campusId) || CAMPUSES[1];

    const newHostel: Hostel = {
      id: `manual-${Date.now()}`,
      name: name.trim(),
      tagline: `Student residence near ${matchedCampus.shortName}`,
      campusId,
      campusName: matchedCampus.name,
      address: address.trim() || `${area || matchedCampus.city}, Ghana`,
      area: area.trim() || matchedCampus.popularAreas[0],
      latitude: matchedCampus.center.lat + (Math.random() - 0.5) * 0.015,
      longitude: matchedCampus.center.lng + (Math.random() - 0.5) * 0.015,
      distanceKm: 1.0,
      walkTimeMins: 12,
      rating: 4.5,
      reviewCount: 1,
      priceMin,
      priceMax,
      currency: 'GHS',
      rooms: [
        {
          type: '1-in-a-room',
          title: 'Single Room',
          pricePerSemester: priceMax,
          pricePerAcademicYear: priceMax * 1.8,
          available: true,
          withAc: true,
          withBathroom: true
        },
        {
          type: '2-in-a-room',
          title: '2-in-a-Room Standard',
          pricePerSemester: priceMin,
          pricePerAcademicYear: priceMin * 1.8,
          available: true,
          withAc: false,
          withBathroom: true
        }
      ],
      amenities: [
        isDumsorProof ? 'Standby Generator (No Dumsor)' : '',
        hasWaterReserve ? 'Water Reservoir Polytank' : '',
        hasFreeWifi ? 'High-Speed WiFi' : '',
        hasFreeShuttle ? 'Free Campus Shuttle' : '',
        '24/7 Security & CCTV',
        'Study Hall'
      ].filter(Boolean),
      photos: [
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80'
      ],
      phoneNumber: phoneNumber.trim(),
      whatsappNumber: whatsappNumber.trim() || phoneNumber.trim(),
      googleMapsUrl: googleMapsUrl.trim() || `https://maps.google.com/?q=${encodeURIComponent(name.trim())}`,
      verified: true,
      gender,
      isDumsorProof,
      hasWaterReserve,
      hasFreeShuttle,
      hasFreeWifi,
      lastUpdated: new Date().toISOString(),
      source: 'student_submission',
      reviews: [
        {
          id: `rev-initial-${Date.now()}`,
          authorName: 'Verified Student Resident',
          rating: 5,
          relativeTimeDescription: 'Recently submitted',
          text: 'Verified and listed directly on HostelSearch.'
        }
      ]
    };

    onAddHostel(newHostel);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">List a Student Hostel</h2>
              <p className="text-xs text-slate-500">Reach thousands of students searching for accommodation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Hostel Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Royal Grace Hostel"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Target Campus *
              </label>
              <select
                value={campusId}
                onChange={(e) => setCampusId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {CAMPUSES.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Area / Suburb *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ayeduase / Bani Road / Amamoma"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Street Address or Landmark
            </label>
            <input
              type="text"
              placeholder="e.g. Near Gaza Junction, Opposite Top High"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number (Calls) *
              </label>
              <input
                type="tel"
                required
                placeholder="+233 24 000 0000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                WhatsApp Booking Number
              </label>
              <input
                type="tel"
                placeholder="+233 24 000 0000"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Min Price / Sem (GHS)
              </label>
              <input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Max Price / Sem (GHS)
              </label>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Google Maps Pin Link
            </label>
            <input
              type="url"
              placeholder="https://maps.app.goo.gl/..."
              value={googleMapsUrl}
              onChange={(e) => setGoogleMapsUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Key Features
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700">
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDumsorProof}
                  onChange={(e) => setIsDumsorProof(e.target.checked)}
                  className="rounded text-brand-600 w-4 h-4"
                />
                <span>⚡ Standby Generator (No Dumsor)</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasWaterReserve}
                  onChange={(e) => setHasWaterReserve(e.target.checked)}
                  className="rounded text-brand-600 w-4 h-4"
                />
                <span>💧 Water Polytanks / Borehole</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasFreeWifi}
                  onChange={(e) => setHasFreeWifi(e.target.checked)}
                  className="rounded text-brand-600 w-4 h-4"
                />
                <span>📶 High-Speed WiFi</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasFreeShuttle}
                  onChange={(e) => setHasFreeShuttle(e.target.checked)}
                  className="rounded text-brand-600 w-4 h-4"
                />
                <span>🚌 Free Campus Shuttle</span>
              </label>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20"
            >
              Submit & Publish Hostel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
