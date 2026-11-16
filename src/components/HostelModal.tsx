import React, { useState } from 'react';
import { 
  X, Star, MapPin, Phone, MessageCircle, ExternalLink, Zap, 
  Droplets, Bus, Check, Bed, Send 
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

  // Review form
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

  const hasPhone = Boolean(hostel.phoneNumber && hostel.phoneNumber.trim().length > 5);
  const whatsappUrl = hasPhone ? `https://wa.me/${hostel.whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
    `Hello Manager of ${hostel.name}, I found your hostel on HostelSearch. Is the ${selectedRoom.title || 'room'} available for this semester?`
  )}` : '';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col my-auto border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">{hostel.name}</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {hostel.gender}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-600" />
              <span>{hostel.address}</span>
              <span>•</span>
              <span>{hostel.distanceKm} km ({hostel.walkTimeMins} mins walk)</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Photos */}
          <div className="space-y-2">
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-900">
              <img
                src={hostel.photos[selectedPhoto] || hostel.photos[0]}
                alt={hostel.name}
                className="w-full h-full object-cover"
              />
            </div>

            {hostel.photos.length > 1 && (
              <div className="flex gap-2">
                {hostel.photos.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhoto(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedPhoto === idx ? 'border-brand-600' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={p} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Rating</span>
              <div className="flex items-center gap-1 font-bold text-slate-800 mt-0.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{hostel.rating.toFixed(1)}</span>
                {hostel.reviewCount > 0 && <span className="text-slate-400 font-normal">({hostel.reviewCount})</span>}
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Power</span>
              <div className="flex items-center gap-1 font-bold text-slate-800 mt-0.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>{hostel.isDumsorProof ? 'Generator' : 'Standard'}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Water</span>
              <div className="flex items-center gap-1 font-bold text-slate-800 mt-0.5">
                <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                <span>{hostel.hasWaterReserve ? 'Reservoir' : 'Standard'}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Shuttle</span>
              <div className="flex items-center gap-1 font-bold text-slate-800 mt-0.5">
                <Bus className="w-3.5 h-3.5 text-blue-600" />
                <span>{hostel.hasFreeShuttle ? 'Free Shuttle' : 'Walking'}</span>
              </div>
            </div>
          </div>

          {/* Room Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-brand-600" /> Room Rates
              </h3>
              <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
                <button
                  onClick={() => setPricingPeriod('semester')}
                  className={`px-2.5 py-1 rounded-md ${pricingPeriod === 'semester' ? 'bg-white shadow-sm text-slate-900 font-bold' : ''}`}
                >
                  Per Semester
                </button>
                <button
                  onClick={() => setPricingPeriod('year')}
                  className={`px-2.5 py-1 rounded-md ${pricingPeriod === 'year' ? 'bg-white shadow-sm text-slate-900 font-bold' : ''}`}
                >
                  Academic Year
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {hostel.rooms.map((room, idx) => {
                const isSelected = selectedRoom.type === room.type;
                const price = pricingPeriod === 'semester' ? room.pricePerSemester : room.pricePerAcademicYear;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedRoom(room)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/40'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-xs text-slate-900">{room.title}</div>
                        <span className="text-[11px] text-slate-500">{room.type.replace('-in-a-room', ' in 1')}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-slate-900">GHS {price.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Google Maps link */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-600" />
              <span className="text-xs font-semibold text-slate-800">Verified Location on Google Maps</span>
            </div>
            <a
              href={hostel.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              <ExternalLink className="w-3.5 h-3.5 text-brand-600" />
              <span>Directions</span>
            </a>
          </div>

          {/* Student Reviews & Form */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Student Reviews ({hostel.reviews.length})
            </h3>

            {hostel.reviews.length === 0 ? (
              <p className="text-xs text-slate-400">No student reviews yet. Be the first to share your experience!</p>
            ) : (
              <div className="space-y-2">
                {hostel.reviews.map((rev) => (
                  <div key={rev.id} className="p-3 rounded-xl bg-slate-50 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{rev.authorName}</span>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{rev.rating}</span>
                      </div>
                    </div>
                    <p className="text-slate-600">{rev.text}</p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="pt-2 border-t border-slate-100 space-y-2">
              {submittedReview && (
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold">
                  Review submitted. Thank you!
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name (e.g. David S.)"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  required
                  className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                />
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                >
                  <option value={5}>5 Stars - Excellent</option>
                  <option value={4}>4 Stars - Good</option>
                  <option value={3}>3 Stars - Average</option>
                  <option value={2}>2 Stars - Poor</option>
                  <option value={1}>1 Star - Terrible</option>
                </select>
              </div>
              <textarea
                placeholder="Share your experience (power, water, distance)..."
                rows={2}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs"
              >
                <Send className="w-3 h-3" />
                <span>Submit Review</span>
              </button>
            </form>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-500">Selected: {selectedRoom.title || 'Room'}</div>
            <div className="text-base font-bold text-slate-900">
              GHS {selectedPrice?.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasPhone ? (
              <>
                <a
                  href={`tel:${hostel.phoneNumber}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </>
            ) : (
              <a
                href={hostel.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
