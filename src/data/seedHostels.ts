import { Hostel } from '../types/hostel';

export const INITIAL_HOSTELS: Hostel[] = [
  {
    id: 'ug-evandy',
    name: 'Evandy Hostel',
    campusId: 'ug-legon',
    campusName: 'University of Ghana (UG Legon)',
    address: 'Bani Road, Off Legon Bypass, University of Ghana, Legon, Accra',
    area: 'Legon Campus',
    latitude: 5.6582,
    longitude: -0.1912,
    distanceKm: 0.8,
    walkTimeMins: 9,
    rating: 4.4,
    reviewCount: 238,
    priceMin: 4200,
    priceMax: 9800,
    currency: 'GHS',
    rooms: [
      {
        type: '1-in-a-room',
        title: 'Single Room',
        pricePerSemester: 5200,
        pricePerAcademicYear: 9800,
        available: true,
        withAc: true,
        withBathroom: true
      },
      {
        type: '2-in-a-room',
        title: '2 in a Room',
        pricePerSemester: 3600,
        pricePerAcademicYear: 6800,
        available: true,
        withAc: true,
        withBathroom: true
      },
      {
        type: '4-in-a-room',
        title: '4 in a Room',
        pricePerSemester: 2200,
        pricePerAcademicYear: 4200,
        available: true,
        withAc: false,
        withBathroom: true
      }
    ],
    amenities: [
      'Standby Generator',
      'Water Reservoir',
      'WiFi',
      'Campus Shuttle',
      '24/7 Security'
    ],
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '',
    whatsappNumber: '',
    website: 'https://evandyhostels.com',
    googleMapsUrl: 'https://maps.google.com/?q=Evandy+Hostel+Legon+Accra',
    googlePlaceId: 'ChIJX9U_EvandyLegon001',
    verified: true,
    gender: 'Co-ed',
    isDumsorProof: true,
    hasWaterReserve: true,
    hasFreeShuttle: true,
    hasFreeWifi: true,
    lastUpdated: '2026-11-15T10:00:00Z',
    source: 'google_maps',
    reviews: []
  },
  {
    id: 'ug-pentagon',
    name: 'Pentagon Hall / African Union Hostel',
    campusId: 'ug-legon',
    campusName: 'University of Ghana (UG Legon)',
    address: 'Pentagon Block A-C, University of Ghana, Legon, Accra',
    area: 'Pentagon Area',
    latitude: 5.6601,
    longitude: -0.1945,
    distanceKm: 1.1,
    walkTimeMins: 12,
    rating: 4.2,
    reviewCount: 412,
    priceMin: 3800,
    priceMax: 8500,
    currency: 'GHS',
    rooms: [
      {
        type: '1-in-a-room',
        title: 'Single Room',
        pricePerSemester: 4500,
        pricePerAcademicYear: 8500,
        available: true,
        withAc: true,
        withBathroom: true
      },
      {
        type: '2-in-a-room',
        title: '2 in a Room',
        pricePerSemester: 3200,
        pricePerAcademicYear: 6100,
        available: true,
        withAc: false,
        withBathroom: true
      },
      {
        type: '4-in-a-room',
        title: '4 in a Room',
        pricePerSemester: 2000,
        pricePerAcademicYear: 3800,
        available: true,
        withAc: false,
        withBathroom: true
      }
    ],
    amenities: [
      'Standby Generator',
      'Water Reservoir',
      'Campus WiFi',
      '24/7 Security'
    ],
    photos: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '',
    whatsappNumber: '',
    googleMapsUrl: 'https://maps.google.com/?q=Pentagon+Hall+University+of+Ghana',
    googlePlaceId: 'ChIJPentagonLegon002',
    verified: true,
    gender: 'Co-ed',
    isDumsorProof: true,
    hasWaterReserve: true,
    hasFreeShuttle: true,
    hasFreeWifi: true,
    lastUpdated: '2026-11-14T14:30:00Z',
    source: 'google_maps',
    reviews: []
  },
  {
    id: 'ug-bani',
    name: 'Bani Hostel',
    campusId: 'ug-legon',
    campusName: 'University of Ghana (UG Legon)',
    address: 'Bani Hostel Road, Near Legon Hall Annex, Legon, Accra',
    area: 'Bani Area',
    latitude: 5.6565,
    longitude: -0.1895,
    distanceKm: 0.6,
    walkTimeMins: 7,
    rating: 4.5,
    reviewCount: 167,
    priceMin: 4000,
    priceMax: 9200,
    currency: 'GHS',
    rooms: [
      {
        type: '1-in-a-room',
        title: 'Single Room',
        pricePerSemester: 4900,
        pricePerAcademicYear: 9200,
        available: true,
        withAc: true,
        withBathroom: true
      },
      {
        type: '2-in-a-room',
        title: '2 in a Room',
        pricePerSemester: 3400,
        pricePerAcademicYear: 6500,
        available: true,
        withAc: true,
        withBathroom: true
      }
    ],
    amenities: [
      'Standby Generator',
      'Water Reservoir',
      'WiFi',
      '24/7 Security'
    ],
    photos: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '',
    whatsappNumber: '',
    googleMapsUrl: 'https://maps.google.com/?q=Bani+Hostel+University+of+Ghana+Legon',
    googlePlaceId: 'ChIJBaniHostelLegon003',
    verified: true,
    gender: 'Co-ed',
    isDumsorProof: true,
    hasWaterReserve: true,
    hasFreeShuttle: false,
    hasFreeWifi: true,
    lastUpdated: '2026-11-16T09:15:00Z',
    source: 'google_maps',
    reviews: []
  },
  {
    id: 'ug-tf-hostel',
    name: 'James Topp Nelson Yankah Hall (TF Hostel)',
    campusId: 'ug-legon',
    campusName: 'University of Ghana (UG Legon)',
    address: 'Haatso-Atomic Road, North Legon, Accra',
    area: 'North Legon',
    latitude: 5.6698,
    longitude: -0.1982,
    distanceKm: 1.8,
    walkTimeMins: 20,
    rating: 4.1,
    reviewCount: 290,
    priceMin: 3200,
    priceMax: 7200,
    currency: 'GHS',
    rooms: [
      {
        type: '2-in-a-room',
        title: '2 in a Room',
        pricePerSemester: 2800,
        pricePerAcademicYear: 5300,
        available: true,
        withAc: false,
        withBathroom: true
      },
      {
        type: '4-in-a-room',
        title: '4 in a Room',
        pricePerSemester: 1800,
        pricePerAcademicYear: 3200,
        available: true,
        withAc: false,
        withBathroom: true
      }
    ],
    amenities: [
      'Campus Shuttle',
      'Generator Power',
      'Water Reservoir',
      '24/7 Security'
    ],
    photos: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '',
    whatsappNumber: '',
    googleMapsUrl: 'https://maps.google.com/?q=TF+Hostel+Legon+Accra',
    googlePlaceId: 'ChIJTFHostelLegon004',
    verified: true,
    gender: 'Co-ed',
    isDumsorProof: true,
    hasWaterReserve: true,
    hasFreeShuttle: true,
    hasFreeWifi: false,
    lastUpdated: '2026-11-13T11:00:00Z',
    source: 'google_maps',
    reviews: []
  },
  {
    id: 'knust-gaza',
    name: 'Gaza Hostel',
    campusId: 'knust',
    campusName: 'Kwame Nkrumah University of Science & Technology (KNUST)',
    address: 'Ayeduase New Site, Near Gaza Junction, Kumasi',
    area: 'Ayeduase',
    latitude: 6.6710,
    longitude: -1.5645,
    distanceKm: 0.7,
    walkTimeMins: 8,
    rating: 4.3,
    reviewCount: 345,
    priceMin: 3900,
    priceMax: 9500,
    currency: 'GHS',
    rooms: [
      {
        type: '1-in-a-room',
        title: 'Single Room',
        pricePerSemester: 5000,
        pricePerAcademicYear: 9500,
        available: true,
        withAc: true,
        withBathroom: true
      },
      {
        type: '2-in-a-room',
        title: '2 in a Room',
        pricePerSemester: 3500,
        pricePerAcademicYear: 6700,
        available: true,
        withAc: true,
        withBathroom: true
      }
    ],
    amenities: [
      'Generator Backup',
      'Water Reservoir',
      'WiFi',
      '24/7 Security'
    ],
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '',
    whatsappNumber: '',
    googleMapsUrl: 'https://maps.google.com/?q=Gaza+Hostel+Ayeduase+Kumasi',
    googlePlaceId: 'ChIJGazaHostelKNUST005',
    verified: true,
    gender: 'Co-ed',
    isDumsorProof: true,
    hasWaterReserve: true,
    hasFreeShuttle: false,
    hasFreeWifi: true,
    lastUpdated: '2026-11-15T16:00:00Z',
    source: 'google_maps',
    reviews: []
  },
  {
    id: 'knust-frontline',
    name: 'Frontline Hostel',
    campusId: 'knust',
    campusName: 'Kwame Nkrumah University of Science & Technology (KNUST)',
    address: 'Ayeduase New Site, Off KNUST Ring Road, Kumasi',
    area: 'Ayeduase',
    latitude: 6.6732,
    longitude: -1.5620,
    distanceKm: 0.9,
    walkTimeMins: 11,
    rating: 4.6,
    reviewCount: 198,
    priceMin: 4500,
    priceMax: 10500,
    currency: 'GHS',
    rooms: [
      {
        type: '1-in-a-room',
        title: 'Single Room',
        pricePerSemester: 5600,
        pricePerAcademicYear: 10500,
        available: true,
        withAc: true,
        withBathroom: true
      },
      {
        type: '2-in-a-room',
        title: '2 in a Room',
        pricePerSemester: 3800,
        pricePerAcademicYear: 7200,
        available: true,
        withAc: true,
        withBathroom: true
      }
    ],
    amenities: [
      'Generator Backup',
      'Water Reservoir',
      'WiFi',
      '24/7 Security'
    ],
    photos: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '',
    whatsappNumber: '',
    googleMapsUrl: 'https://maps.google.com/?q=Frontline+Hostel+KNUST+Kumasi',
    googlePlaceId: 'ChIJFrontlineKNUST006',
    verified: true,
    gender: 'Co-ed',
    isDumsorProof: true,
    hasWaterReserve: true,
    hasFreeShuttle: true,
    hasFreeWifi: true,
    lastUpdated: '2026-11-16T08:00:00Z',
    source: 'google_maps',
    reviews: []
  },
  {
    id: 'ucc-amamoma',
    name: 'Amamoma Student Hostels',
    campusId: 'ucc',
    campusName: 'University of Cape Coast (UCC)',
    address: 'Amamoma Main Road, Opposite UCC Gate, Cape Coast',
    area: 'Amamoma',
    latitude: 5.1180,
    longitude: -1.2910,
    distanceKm: 0.5,
    walkTimeMins: 6,
    rating: 4.4,
    reviewCount: 142,
    priceMin: 3400,
    priceMax: 7800,
    currency: 'GHS',
    rooms: [
      {
        type: '1-in-a-room',
        title: 'Single Room',
        pricePerSemester: 4200,
        pricePerAcademicYear: 7800,
        available: true,
        withAc: true,
        withBathroom: true
      },
      {
        type: '2-in-a-room',
        title: '2 in a Room',
        pricePerSemester: 2900,
        pricePerAcademicYear: 5400,
        available: true,
        withAc: false,
        withBathroom: true
      }
    ],
    amenities: [
      'Generator Backup',
      'Water Reservoir',
      'Security'
    ],
    photos: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '',
    whatsappNumber: '',
    googleMapsUrl: 'https://maps.google.com/?q=Amamoma+Hostels+UCC+Cape+Coast',
    googlePlaceId: 'ChIJAmamomaUCC008',
    verified: true,
    gender: 'Co-ed',
    isDumsorProof: true,
    hasWaterReserve: true,
    hasFreeShuttle: false,
    hasFreeWifi: true,
    lastUpdated: '2026-11-14T09:00:00Z',
    source: 'google_maps',
    reviews: []
  }
];
