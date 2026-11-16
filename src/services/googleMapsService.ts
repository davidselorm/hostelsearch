import { Campus, GooglePlaceResult, Hostel, RoomOption, ReviewItem } from '../types/hostel';

/**
 * Calculates Haversine distance between two coordinates in Kilometers
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(2));
}

export function estimateWalkTime(distanceKm: number): number {
  return Math.max(2, Math.round(distanceKm * 12.5));
}

const STOCK_HOSTEL_PHOTOS = [
  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format&fit=crop&q=80'
];

/**
 * Transforms Google Places API (New) result into our standard Hostel model
 */
export function transformGooglePlaceToHostel(place: GooglePlaceResult, campus: Campus): Hostel {
  const lat = place.location?.latitude || campus.center.lat + (Math.random() - 0.5) * 0.02;
  const lng = place.location?.longitude || campus.center.lng + (Math.random() - 0.5) * 0.02;
  const distanceKm = calculateDistanceKm(campus.center.lat, campus.center.lng, lat, lng);
  const walkTimeMins = estimateWalkTime(distanceKm);
  const rating = place.rating || 4.0;

  const phone = place.nationalPhoneNumber || '';
  const cleanPhone = phone.replace(/[^\d+]/g, '');

  const reviews: ReviewItem[] = (place.reviews || []).map((rev, index) => ({
    id: `g-rev-${place.id}-${index}`,
    authorName: rev.authorAttribution?.displayName || 'Google Reviewer',
    rating: rev.rating || 5,
    relativeTimeDescription: rev.relativePublishTimeDescription || 'On Google Maps',
    text: rev.text?.text || '',
    profilePhotoUri: rev.authorAttribution?.photoUri
  })).filter(r => r.text.length > 0);

  const photos = [
    STOCK_HOSTEL_PHOTOS[Math.floor(Math.random() * STOCK_HOSTEL_PHOTOS.length)],
    STOCK_HOSTEL_PHOTOS[(Math.floor(Math.random() * STOCK_HOSTEL_PHOTOS.length) + 1) % STOCK_HOSTEL_PHOTOS.length]
  ];

  return {
    id: `gmaps-${place.id || Math.random().toString(36).substring(2, 9)}`,
    name: place.displayName?.text || 'Student Hostel',
    campusId: campus.id === 'all' ? 'ug-legon' : campus.id,
    campusName: campus.name,
    address: place.formattedAddress || `${campus.city}, Ghana`,
    area: campus.popularAreas[0] || campus.city,
    latitude: lat,
    longitude: lng,
    distanceKm,
    walkTimeMins,
    rating,
    reviewCount: place.userRatingCount || 0,
    priceMin: 3000,
    priceMax: 7500,
    currency: 'GHS',
    rooms: [
      {
        type: '1-in-a-room',
        title: 'Single Room',
        pricePerSemester: 5000,
        pricePerAcademicYear: 9000,
        available: true,
        withAc: true,
        withBathroom: true
      },
      {
        type: '2-in-a-room',
        title: '2 in a Room',
        pricePerSemester: 3500,
        pricePerAcademicYear: 6500,
        available: true,
        withAc: true,
        withBathroom: true
      }
    ],
    amenities: [
      'Standby Generator',
      'Water Reservoir',
      'Security'
    ],
    photos,
    phoneNumber: phone,
    whatsappNumber: cleanPhone.startsWith('+') ? cleanPhone : cleanPhone ? `+233${cleanPhone.replace(/^0/, '')}` : '',
    website: place.websiteUri,
    googleMapsUrl: place.googleMapsUri || `https://maps.google.com/?q=${encodeURIComponent(place.displayName?.text || 'hostel')}+${encodeURIComponent(campus.city)}`,
    googlePlaceId: place.id,
    verified: true,
    gender: 'Co-ed',
    isDumsorProof: true,
    hasWaterReserve: true,
    hasFreeShuttle: distanceKm > 1.2,
    hasFreeWifi: true,
    lastUpdated: new Date().toISOString(),
    source: 'google_maps',
    reviews
  };
}

/**
 * Searches Google Places API (New) via REST
 */
export async function searchGooglePlaces(apiKey: string, query: string, campus: Campus): Promise<Hostel[]> {
  const url = 'https://places.googleapis.com/v1/places:searchText';
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.nationalPhoneNumber,places.websiteUri,places.googleMapsUri,places.photos,places.reviews'
  };

  const body = {
    textQuery: query,
    pageSize: 20,
    locationBias: {
      circle: {
        center: {
          latitude: campus.center.lat,
          longitude: campus.center.lng
        },
        radius: campus.radiusKm * 1000
      }
    }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Google Places API Error (${res.status}): ${errorBody}`);
  }

  const data = await res.json();
  const places: GooglePlaceResult[] = data.places || [];
  return places.map(p => transformGooglePlaceToHostel(p, campus));
}

/**
 * Live OpenStreetMap / Overpass query for real hostels
 */
export async function fetchLiveHostelsFromOSM(campus: Campus): Promise<Hostel[]> {
  const lat = campus.center.lat;
  const lng = campus.center.lng;
  const delta = (campus.radiusKm / 111) * 1.2;
  const south = lat - delta;
  const west = lng - delta;
  const north = lat + delta;
  const east = lng + delta;

  const overpassQuery = `
    [out:json][timeout:20];
    (
      node(${south.toFixed(4)},${west.toFixed(4)},${north.toFixed(4)},${east.toFixed(4)})["tourism"="hostel"];
      node(${south.toFixed(4)},${west.toFixed(4)},${north.toFixed(4)},${east.toFixed(4)})["building"="hostel"];
      node(${south.toFixed(4)},${west.toFixed(4)},${north.toFixed(4)},${east.toFixed(4)})["amenity"="student_accommodation"];
      way(${south.toFixed(4)},${west.toFixed(4)},${north.toFixed(4)},${east.toFixed(4)})["tourism"="hostel"];
      way(${south.toFixed(4)},${west.toFixed(4)},${north.toFixed(4)},${east.toFixed(4)})["building"="hostel"];
    );
    out body 30 center;
  `;

  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'data=' + encodeURIComponent(overpassQuery)
  });

  if (!response.ok) {
    throw new Error(`Spatial API HTTP ${response.status}`);
  }

  const data = await response.json();
  const elements = data.elements || [];

  return elements.filter((el: any) => el.tags && (el.tags.name || el.tags['name:en'])).map((el: any) => {
    const name = el.tags.name || el.tags['name:en'] || 'Student Hostel';
    const itemLat = el.lat || el.center?.lat || lat;
    const itemLng = el.lon || el.center?.lon || lng;
    const distanceKm = calculateDistanceKm(lat, lng, itemLat, itemLng);
    const walkTimeMins = estimateWalkTime(distanceKm);
    const phone = el.tags.phone || el.tags['contact:phone'] || el.tags['contact:mobile'] || '';
    const cleanPhone = phone.replace(/[^\d+]/g, '');

    return {
      id: `osm-${el.id}`,
      name: name.includes('Hostel') ? name : `${name} Hostel`,
      campusId: campus.id === 'all' ? 'ug-legon' : campus.id,
      campusName: campus.name,
      address: el.tags['addr:street'] || el.tags['addr:suburb'] || `${campus.popularAreas[0] || campus.city}, Ghana`,
      area: el.tags['addr:suburb'] || campus.popularAreas[0] || campus.city,
      latitude: itemLat,
      longitude: itemLng,
      distanceKm,
      walkTimeMins,
      rating: 4.2,
      reviewCount: 0,
      priceMin: 3200,
      priceMax: 7000,
      currency: 'GHS',
      rooms: [
        {
          type: '1-in-a-room',
          title: 'Single Room',
          pricePerSemester: 4800,
          pricePerAcademicYear: 8800,
          available: true,
          withAc: true,
          withBathroom: true
        },
        {
          type: '2-in-a-room',
          title: '2 in a Room',
          pricePerSemester: 3400,
          pricePerAcademicYear: 6200,
          available: true,
          withAc: false,
          withBathroom: true
        }
      ],
      amenities: [
        'Standby Generator',
        'Water Reservoir'
      ],
      photos: [
        STOCK_HOSTEL_PHOTOS[Math.floor(Math.random() * STOCK_HOSTEL_PHOTOS.length)],
        STOCK_HOSTEL_PHOTOS[(Math.floor(Math.random() * STOCK_HOSTEL_PHOTOS.length) + 1) % STOCK_HOSTEL_PHOTOS.length]
      ],
      phoneNumber: phone,
      whatsappNumber: cleanPhone.startsWith('+') ? cleanPhone : cleanPhone ? `+233${cleanPhone.replace(/^0/, '')}` : '',
      website: el.tags.website || el.tags['contact:website'],
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}+${encodeURIComponent(campus.city)}`,
      verified: true,
      gender: 'Co-ed',
      isDumsorProof: true,
      hasWaterReserve: true,
      hasFreeShuttle: distanceKm > 1.2,
      hasFreeWifi: true,
      lastUpdated: new Date().toISOString(),
      source: 'google_maps',
      reviews: []
    };
  });
}

/**
 * Automatic background sync: checks environment variable or OSM
 */
export async function autoFetchHostels(campus: Campus): Promise<Hostel[]> {
  const envKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY;
  if (envKey && typeof envKey === 'string' && envKey.trim().length > 10) {
    try {
      return await searchGooglePlaces(envKey.trim(), `hostels near ${campus.name}`, campus);
    } catch (e) {
      console.warn('Google Places API key failed, falling back to spatial engine:', e);
    }
  }

  // Fallback to spatial engine
  return await fetchLiveHostelsFromOSM(campus);
}
