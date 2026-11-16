export type GenderPolicy = 'Co-ed' | 'Female Only' | 'Male Only';

export type RoomCapacityType = '1-in-a-room' | '2-in-a-room' | '3-in-a-room' | '4-in-a-room';

export interface RoomOption {
  type: RoomCapacityType;
  title: string;
  pricePerSemester: number;
  pricePerAcademicYear: number;
  available: boolean;
  withAc: boolean;
  withBathroom: boolean;
  description?: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  rating: number;
  relativeTimeDescription: string;
  text: string;
  profilePhotoUri?: string;
}

export interface Hostel {
  id: string;
  name: string;
  tagline?: string;
  campusId: string;
  campusName: string;
  address: string;
  area: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  walkTimeMins: number;
  rating: number;
  reviewCount: number;
  priceMin: number;
  priceMax: number;
  currency: string;
  rooms: RoomOption[];
  amenities: string[];
  photos: string[];
  phoneNumber: string;
  whatsappNumber: string;
  website?: string;
  googleMapsUrl: string;
  googlePlaceId?: string;
  verified: boolean;
  gender: GenderPolicy;
  reviews: ReviewItem[];
  source: 'google_maps' | 'verified_partner' | 'student_submission';
  isDumsorProof: boolean; // Has generator or solar
  hasWaterReserve: boolean; // Polytank / borehole
  hasFreeShuttle: boolean;
  hasFreeWifi: boolean;
  lastUpdated: string;
}

export interface Campus {
  id: string;
  name: string;
  shortName: string;
  city: string;
  center: {
    lat: number;
    lng: number;
  };
  radiusKm: number;
  popularAreas: string[];
  imageUrl: string;
}

export interface FilterState {
  searchQuery: string;
  campusId: string;
  maxPrice: number;
  roomTypes: RoomCapacityType[];
  amenities: string[];
  gender: 'all' | GenderPolicy;
  minRating: number;
  maxDistanceKm: number;
  sortBy: 'recommended' | 'price_asc' | 'price_desc' | 'rating' | 'distance';
}

export interface GooglePlaceResult {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  location?: { latitude: number; longitude: number };
  rating?: number;
  userRatingCount?: number;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  googleMapsUri?: string;
  photos?: Array<{ name: string; authorAttributions?: Array<{ displayName: string }> }>;
  reviews?: Array<{
    authorAttribution?: { displayName: string; photoUri: string };
    rating: number;
    text?: { text: string };
    relativePublishTimeDescription?: string;
  }>;
  primaryTypeDisplayName?: { text: string };
  currentOpeningHours?: { openNow: boolean };
}
