import React, { useState } from 'react';
import { 
  X, Star, MapPin, Phone, MessageCircle, ExternalLink, Zap, 
  Droplets, Wifi, Bus, ShieldCheck, Check, Calendar, Bed, User, Send 
} from 'lucide-react';
import { Hostel, RoomOption } from '../types/hostel';

interface HostelModalProps {
  hostel: Hostel;
  onClose: () => void;
  onAddReview: (hostelId: string, author: string, rating: number, text: string) => void;
}

export const HostelModal: React.FC<HostelModalProps> = ({
  hostel,
  onClose,
  onAddReview
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [pricingPeriod, setPricingPeriod] = useState<'semester' | 'year'>('semester');
  const [selectedRoom, setSelectedRoom] = useState<RoomOption>(hostel.rooms[0] || {} as RoomOption);

  // Review form state
  const [authorName, setAuthorName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submittedReview, setSubmittedReview] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;
    onAddReview(hostel.id, authorName.trim(), newRating, reviewText.trim());
    setSubmittedReview(true);
    setAuthorName('');
    setReviewText('');
  };

  const selectedPrice = pricingPeriod === 'semester' 
    ? selectedRoom.pricePerSemester 
    : selectedRoom.pricePerAcademicYear;

  const inquiryMessage = encodeURIComponent(
    `Hello Manager of ${hostel.name},\n\nI found your hostel on HostelSearch (Google Maps verified). I am interested in booking:\n• Room Type: ${selectedRoom.title || 'Student Room'}\n• Duration: ${pricingPeriod === 'semester' ? '1 Semester' : 'Full Academic Year'}\n• Price: GHS ${selectedPrice?.toLocaleString()}\n\nIs this room currently available for viewing or reservation?`
  );

  const whatsappUrl = `https://wa.me/${hostel.whatsappNumber.replace(/[^\d]/g, '')}?text=${inquiryMessage}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Close Button */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{hostel.name}</h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                {hostel.gender}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
              <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span>{hostel.address}</span>
              <span>•</span>
              <span className="font-semibold text-slate-700">{hostel.distanceKm} km ({hostel.walkTimeMins} mins walk)</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-8">
          
          {/* Photo Gallery & Thumbnail strip */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-900">
              <img
                src={hostel.photos[selectedPhoto] || hostel.photos[0]}
                alt={hostel.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
                Photo {selectedPhoto + 1} of {hostel.photos.length}
              </div>
            </div>

            {/* Thumbnail selector */}
            {hostel.photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {hostel.photos.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhoto(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedPhoto === idx ? 'border-brand-600 scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={p} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <div className="text-xs text-slate-500 font-medium">Google Rating</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-extrabold text-slate-900 text-base">{hostel.rating.toFixed(1)}</span>
                <span className="text-xs text-slate-400">({hostel.reviewCount} reviews)</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-500 font-medium">Power Reliability</div>
              <div className="flex items-center gap-1.5 mt-0.5 text-xs font-bold text-amber-700">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{hostel.isDumsorProof ? 'Generator Backup' : 'Standard Grid'}</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-500 font-medium">Water Security</div>
              <div className="flex items-center gap-1.5 mt-0.5 text-xs font-bold text-cyan-700">
                <Droplets className="w-4 h-4 text-cyan-600" />
                <span>{hostel.hasWaterReserve ? 'Tanks + Borehole' : 'Tap Only'}</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-500 font-medium">Campus Transit</div>
              <div className="flex items-center gap-1.5 mt-0.5 text-xs font-bold text-blue-700">
                <Bus className="w-4 h-4 text-blue-600" />
                <span>{hostel.hasFreeShuttle ? 'Free Shuttle' : 'Walking Friendly'}</span>
              </div>
            </div>
          </div>

          {/* Room Options & Pricing Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Bed className="w-5 h-5 text-brand-600" /> Available Room Capacities & Rates
                </h3>
                <p className="text-xs text-slate-500">Select a room to configure your WhatsApp booking inquiry</p>
              </div>

              {/* Pricing Period Toggle */}
              <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200">
                <button
                  onClick={() => setPricingPeriod('semester')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    pricingPeriod === 'semester' ? 'bg-white text-slate-900 shadow-sm font-bold' : ''
                  }`}
                >
                  Per Semester
                </button>
                <button
                  onClick={() => setPricingPeriod('year')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    pricingPeriod === 'year' ? 'bg-white text-slate-900 shadow-sm font-bold' : ''
                  }`}
                >
                  Academic Year
                </button>
              </div>
            </div>

            {/* Room Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hostel.rooms.map((room, idx) => {
                const isSelected = selectedRoom.type === room.type;
                const price = pricingPeriod === 'semester' ? room.pricePerSemester : room.pricePerAcademicYear;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedRoom(room)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/40 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-sm text-slate-900">{room.title}</div>
                        <span className="text-[11px] font-semibold text-brand-600 uppercase tracking-wide">
                          {room.type.replace('-in-a-room', ' Student Room')}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-extrabold text-slate-900">
                          GHS {price.toLocaleString()}
                        </div>
                        <span className="text-[10px] text-slate-500">
                          /{pricingPeriod === 'semester' ? 'sem' : 'year'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">{room.description}</p>

                    <div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-slate-600">
                      {room.withAc && (
                        <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-md font-semibold">
                          AC Included
                        </span>
                      )}
                      {room.withBathroom && (
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-semibold">
                          Private Ensuite
                        </span>
                      )}
                      {room.available ? (
                        <span className="text-emerald-600 font-semibold ml-auto flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Available
                        </span>
                      ) : (
                        <span className="text-rose-500 font-semibold ml-auto">
                          Fully Booked
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Amenities Checklist */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-600" /> Hostel Amenities & Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {hostel.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Google Maps Embed & Location Verification */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Google Maps Verified Coordinates</h4>
                <p className="text-xs text-slate-500">
                  Latitude: {hostel.latitude.toFixed(5)}, Longitude: {hostel.longitude.toFixed(5)}
                </p>
              </div>
            </div>

            <a
              href={hostel.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-100 shadow-sm transition-all"
            >
              <ExternalLink className="w-4 h-4 text-brand-600" />
              <span>Get Turn-by-Turn Directions</span>
            </a>
          </div>

          {/* Student Reviews & Form */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" /> Student Reviews ({hostel.reviews.length})
              </h3>
            </div>

            <div className="space-y-3">
              {hostel.reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                        {rev.authorName.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{rev.authorName}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-9">{rev.text}</p>
                </div>
              ))}
            </div>

            {/* Leave a review box */}
            <form onSubmit={handleReviewSubmit} className="mt-4 p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Leave a Student Review</h4>
              {submittedReview && (
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold">
                  Thank you! Your review has been added to this hostel.
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Samuel K., UG Level 300)"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  required
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span>Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-1 text-slate-300 hover:text-amber-500 transition-colors"
                      >
                        <Star className={`w-4 h-4 ${star <= newRating ? 'text-amber-500 fill-amber-500' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <textarea
                placeholder="Share your experience (water supply, generator during light-outs, porter attitude, room condition)..."
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Student Review</span>
              </button>
            </form>
          </div>

        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 z-10 shadow-lg">
          <div>
            <div className="text-xs text-slate-500">
              Selected: <strong className="text-slate-800">{selectedRoom.title || 'Standard'}</strong> ({pricingPeriod})
            </div>
            <div className="text-xl font-extrabold text-slate-900">
              GHS {selectedPrice?.toLocaleString() || hostel.priceMin.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`tel:${hostel.phoneNumber}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Manager</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
