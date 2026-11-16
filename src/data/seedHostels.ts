import { Hostel } from '../types/hostel';

export const INITIAL_HOSTELS: Hostel[] = [
  {
    id: 'ug-evandy',
    name: 'Evandy Hostel',
    tagline: 'Premium student living with 24/7 power backup & shuttle service',
    campusId: 'ug-legon',
    campusName: 'University of Ghana (UG Legon)',
    address: 'Bani Road, Off Legon Bypass, University of Ghana, Legon, Accra',
    area: 'Legon Campus / Bani Area',
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
        title: 'Single Executive (Air Conditioned)',
        pricePerSemester: 5200,
        pricePerAcademicYear: 9800,
        available: true,
        withAc: true,
        withBathroom: true,
        description: 'Private room with private ensuite bathroom, silent inverter AC, and balcony.'
      },
      {
        type: '2-in-a-room',
        title: '2-in-a-Room Standard Ensuite',
        pricePerSemester: 3600,
        pricePerAcademicYear: 6800,
        available: true,
        withAc: true,
        withBathroom: true,
        description: 'Shared between 2 students, separate study desks, wardrobe, private washroom.'
      },
      {
        type: '3-in-a-room',
        title: '3-in-a-Room Economy',
        pricePerSemester: 2700,
        pricePerAcademicYear: 5100,
        available: false,
        withAc: false,
        withBathroom: true,
        description: 'Spacious shared room with ceiling fans, shared study space, and attached bathroom.'
      },
      {
        type: '4-in-a-room',
        title: '4-in-a-Room Budget Friendly',
        pricePerSemester: 2200,
        pricePerAcademicYear: 4200,
        available: true,
        withAc: false,
        withBathroom: true,
        description: 'Affordable communal option with individual lockers and study desks.'
      }
    ],
    amenities: [
      'Industrial Standby Generator (No Dumsor)',
      'High-Capacity Water Polytanks & Borehole',
      'High-Speed Fiber WiFi',
      'Free Campus Shuttle Bus',
      '24/7 Security & CCTV',
      'Minimart & Pharmacy on-site',
      'Common Study Library',
      'DSTV Student Lounge',
      'Modern Laundry Services',
      'Basketball Court'
    ],
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '+233 24 456 7891',
    whatsappNumber: '+233244567891',
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
    reviews: [
      {
        id: 'rev-1',
        authorName: 'Kwame Mensah',
        rating: 5,
        relativeTimeDescription: '2 weeks ago',
        text: 'The best hostel experience at Legon so far. The generator kicks in within 15 seconds during ECG power cuts, which saved me during midsems. The shuttle is always punctual.'
      },
      {
        id: 'rev-2',
        authorName: 'Akosua Frimpong',
        rating: 4,
        relativeTimeDescription: '1 month ago',
        text: 'Rooms are tidy and spacious. Water pressure is steady throughout the day. Only wish they had more washing machines during peak weekends.'
      },
      {
        id: 'rev-3',
        authorName: 'Emmanuel Osei',
        rating: 5,
        relativeTimeDescription: '2 months ago',
        text: 'Super clean, high speed internet that actually works for video lectures, and friendly porters.'
      }
    ]
  },
  {
    id: 'ug-pentagon',
    name: 'Pentagon Hall / African Union Hostel',
    tagline: 'The biggest student community with unbeatable social and academic life',
    campusId: 'ug-legon',
    campusName: 'University of Ghana (UG Legon)',
    address: 'Pentagon Block A-C, University of Ghana, Legon, Accra',
    area: 'Pentagon Area, Legon',
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
        title: 'Single Room Block A/B',
        pricePerSemester: 4500,
        pricePerAcademicYear: 8500,
        available: false,
        withAc: true,
        withBathroom: true,
        description: 'Single executive room with balcony view, self-contained.'
      },
      {
        type: '2-in-a-room',
        title: '2-in-a-Room Standard',
        pricePerSemester: 3200,
        pricePerAcademicYear: 6100,
        available: true,
        withAc: false,
        withBathroom: true,
        description: 'Shared room with attached washroom, study corner, and individual closets.'
      },
      {
        type: '4-in-a-room',
        title: '4-in-a-Room Classic',
        pricePerSemester: 2000,
        pricePerAcademicYear: 3800,
        available: true,
        withAc: false,
        withBathroom: true,
        description: 'High energy student living with 4 single beds and designated storage.'
      }
    ],
    amenities: [
      'Backup Power Generator',
      'Massive Water Reservoir Tank',
      'High-Speed Campus WiFi',
      'Food Court with 15+ Local & Continental Vendors',
      'ATM Gallery (Ecobank, GCB, CalBank)',
      'Salons & Barbershops within the block',
      '24/7 Security Patrols',
      'Reading & Seminar Rooms'
    ],
    photos: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '+233 20 812 3456',
    whatsappNumber: '+233208123456',
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
    reviews: [
      {
        id: 'rev-4',
        authorName: 'Nana Yeboah',
        rating: 4,
        relativeTimeDescription: '3 weeks ago',
        text: 'The vibrant atmosphere is unmatched. Everything you need is right downstairs, from bank ATMs to hot waakye in the morning.'
      },
      {
        id: 'rev-5',
        authorName: 'Sarah Lamptey',
        rating: 4,
        relativeTimeDescription: '2 months ago',
        text: 'Water supply is reliable. Great shuttle access to the main campus lecture halls.'
      }
    ]
  },
  {
    id: 'ug-bani',
    name: 'Bani Hostel',
    tagline: 'Quiet, serene environment ideal for high-achieving university scholars',
    campusId: 'ug-legon',
    campusName: 'University of Ghana (UG Legon)',
    address: 'Bani Hostel Road, Near Legon Hall Annex, Legon, Accra',
    area: 'Bani / Central Legon',
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
        title: 'Single Deluxe Studio',
        pricePerSemester: 4900,
        pricePerAcademicYear: 9200,
        available: true,
        withAc: true,
        withBathroom: true,
        description: 'Private studio with personal fridge provision, inverter AC, and balcony.'
      },
      {
        type: '2-in-a-room',
        title: 'Double Ensuite',
        pricePerSemester: 3400,
        pricePerAcademicYear: 6500,
        available: true,
        withAc: true,
        withBathroom: true,
        description: '2 single beds, 2 matching mahogany study desks with reading lamps.'
      },
      {
        type: '3-in-a-room',
        title: 'Triple Standard',
        pricePerSemester: 2500,
        pricePerAcademicYear: 4800,
        available: true,
        withAc: false,
        withBathroom: true,
        description: 'Roomy 3-person room with ceiling fans and ample wardrobe space.'
      }
    ],
    amenities: [
      'Silent Generator Backup (Automatic switch)',
      'Continuous Running Water with Dual Boreholes',
      'Dedicated Academic Silent Library',
      'Free High-Speed WiFi',
      '24hr Porter & Security Guarding',
      'On-site Cafeteria & Fruit Bar',
      'Laundry Basin Area & Drying Terrace'
    ],
    photos: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '+233 24 991 2233',
    whatsappNumber: '+233249912233',
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
    reviews: [
      {
        id: 'rev-6',
        authorName: 'Cynthia Adobea',
        rating: 5,
        relativeTimeDescription: '3 weeks ago',
        text: 'If you want peace of mind to study without noise and uninterrupted power, Bani is the best choice on campus.'
      }
    ]
  },
  {
    id: 'ug-tf-hostel',
    name: 'James Topp Nelson Yankah Hall (TF Hostel)',
    tagline: 'Affordable, secure student housing with great community vibe',
    campusId: 'ug-legon',
    campusName: 'University of Ghana (UG Legon)',
    address: 'Haatso-Atomic Road, North Legon, Accra',
    area: 'North Legon / Atomic',
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
        type: '1-in-a-room',
        title: 'Single Room',
        pricePerSemester: 3800,
        pricePerAcademicYear: 7200,
        available: false,
        withAc: false,
        withBathroom: true,
        description: 'Single room with self-contained bathroom.'
      },
      {
        type: '2-in-a-room',
        title: '2-in-a-Room Standard',
        pricePerSemester: 2800,
        pricePerAcademicYear: 5300,
        available: true,
        withAc: false,
        withBathroom: true,
        description: 'Comfortable shared room for two with built-in cupboards.'
      },
      {
        type: '4-in-a-room',
        title: '4-in-a-Room Budget',
        pricePerSemester: 1800,
        pricePerAcademicYear: 3200,
        available: true,
        withAc: false,
        withBathroom: true,
        description: 'Most economical option on the north side with private shower.'
      }
    ],
    amenities: [
      'Frequent Campus Shuttle to Central Lecture Halls',
      'Generator Power',
      'Large Water Storage Tanks',
      'Food Joints & Grocery Shops Inside',
      'CCTV Monitoring & Uniformed Security',
      'Table Tennis & Gaming Corner'
    ],
    photos: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '+233 26 123 4567',
    whatsappNumber: '+233261234567',
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
    reviews: [
      {
        id: 'rev-7',
        authorName: 'Joshua Tetteh',
        rating: 4,
        relativeTimeDescription: '1 month ago',
        text: 'The shuttles run every 15 minutes in the morning so the distance to campus is really not an issue.'
      }
    ]
  },
  {
    id: 'knust-gaza',
    name: 'Gaza Hostel (Ayeduase)',
    tagline: 'Iconic KNUST student residence right in the heart of Ayeduase',
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
        title: 'Single Executive Suite',
        pricePerSemester: 5000,
        pricePerAcademicYear: 9500,
        available: true,
        withAc: true,
        withBathroom: true,
        description: 'Single executive with AC, water heater, and personal balcony.'
      },
      {
        type: '2-in-a-room',
        title: '2-in-a-Room Luxury',
        pricePerSemester: 3500,
        pricePerAcademicYear: 6700,
        available: true,
        withAc: true,
        withBathroom: true,
        description: 'Two study desks, ceiling fans plus split AC, en-suite bathroom.'
      },
      {
        type: '3-in-a-room',
        title: '3-in-a-Room Standard',
        pricePerSemester: 2600,
        pricePerAcademicYear: 4900,
        available: true,
        withAc: false,
        withBathroom: true,
        description: 'Spacious 3-person room with wardrobe for each resident.'
      },
      {
        type: '4-in-a-room',
        title: '4-in-a-Room Value',
        pricePerSemester: 2100,
        pricePerAcademicYear: 3900,
        available: true,
        withAc: false,
        withBathroom: true,
        description: 'Budget tier with clean ensuite bathroom and personal reading desks.'
      }
    ],
    amenities: [
      'Automatic Heavy-Duty Generator',
      'Constant Water Supply (Borehole + Filtration)',
      'Free Fiber-optic WiFi in all corridors',
      'Walking distance to Ayeduase Gate (KNUST)',
      'Elevator / Lift in main towers',
      '24/7 Security Officers & Electric Fencing',
      'Mart, Printing Press, and Eateries at Ground Level'
    ],
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '+233 24 333 8811',
    whatsappNumber: '+233243338811',
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
    reviews: [
      {
        id: 'rev-8',
        authorName: 'Kelvin Boateng',
        rating: 5,
        relativeTimeDescription: '2 weeks ago',
        text: 'The best thing about Gaza is that you can literally walk to engineering lectures within 10 minutes. Also water never goes off.'
      },
      {
        id: 'rev-9',
        authorName: 'Priscilla Addo',
        rating: 4,
        relativeTimeDescription: '1 month ago',
        text: 'Safe environment, lots of security around, and quiet study rooms at night.'
      }
    ]
  },
  {
    id: 'knust-frontline',
    name: 'Frontline Hostel',
    tagline: 'Modern architectural marvel with deluxe student amenities',
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
        title: 'Single Presidential',
        pricePerSemester: 5600,
        pricePerAcademicYear: 10500,
        available: true,
        withAc: true,
        withBathroom: true,
        description: 'Top floor suite with air conditioning, refrigerator, and panoramic views.'
      },
      {
        type: '2-in-a-room',
        title: '2-in-a-Room Executive',
        pricePerSemester: 3800,
        pricePerAcademicYear: 7200,
        available: true,
        withAc: true,
        withBathroom: true,
        description: 'Luxury twin sharing with dual study nooks and water heater.'
      }
    ],
    amenities: [
      '24/7 Power Guarantee with Perkins Generator',
      'Solar Heated Showers',
      'Private Gym & Fitness Center for Residents',
      'Ultra-Fast Fiber Optic WiFi',
      'Biometric Access Control to all floors',
      'Dedicated Study Hall with AC'
    ],
    photos: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '+233 50 119 4488',
    whatsappNumber: '+233501194488',
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
    reviews: [
      {
        id: 'rev-10',
        authorName: 'Nana Kofi',
        rating: 5,
        relativeTimeDescription: '3 weeks ago',
        text: 'The gym on the 1st floor is well maintained, and the WiFi speed is top notch for online coding assessments.'
      }
    ]
  },
  {
    id: 'knust-supertels',
    name: 'Supertels Hostel (Kotei)',
    tagline: 'Serene executive hostel with shuttle service to KNUST campus',
    campusId: 'knust',
    campusName: 'Kwame Nkrumah University of Science & Technology (KNUST)',
    address: 'Kotei High Street, Near Kotei Post Office, Kumasi',
    area: 'Kotei',
    latitude: 6.6640,
    longitude: -1.5580,
    distanceKm: 1.6,
    walkTimeMins: 18,
    rating: 4.4,
    reviewCount: 156,
    priceMin: 3600,
    priceMax: 8200,
    currency: 'GHS',
    rooms: [
      {
        type: '1-in-a-room',
        title: 'Single Ensuite',
        pricePerSemester: 4400,
        pricePerAcademicYear: 8200,
        available: true,
        withAc: true,
        withBathroom: true,
        description: 'Single room with air conditioning, personal study table, and tiled bathroom.'
      },
      {
        type: '2-in-a-room',
        title: '2-in-a-Room Standard',
        pricePerSemester: 3100,
        pricePerAcademicYear: 5800,
        available: true,
        withAc: false,
        withBathroom: true,
        description: 'Equipped with spacious closets, reading tables, and fans.'
      },
      {
        type: '3-in-a-room',
        title: '3-in-a-Room Classic',
        pricePerSemester: 2400,
        pricePerAcademicYear: 4500,
        available: true,
        withAc: false,
        withBathroom: true,
        description: 'Roomy 3-in-a-room with clean washroom.'
      }
    ],
    amenities: [
      'Frequent Dedicated Shuttle Bus to KNUST Commercial Area',
      'Standby Generator System',
      'Treated Borehole Water & Reservoir',
      'Free High-Speed WiFi',
      'CCTV Monitoring & 24hr Guard',
      'Spacious Car Park & Gated Compound'
    ],
    photos: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '+233 20 774 1199',
    whatsappNumber: '+233207741199',
    googleMapsUrl: 'https://maps.google.com/?q=Supertels+Hostel+Kotei+Kumasi',
    googlePlaceId: 'ChIJSupertelsKotei007',
    verified: true,
    gender: 'Co-ed',
    isDumsorProof: true,
    hasWaterReserve: true,
    hasFreeShuttle: true,
    hasFreeWifi: true,
    lastUpdated: '2026-11-12T15:20:00Z',
    source: 'google_maps',
    reviews: [
      {
        id: 'rev-11',
        authorName: 'Abena Serwaa',
        rating: 4,
        relativeTimeDescription: '1 month ago',
        text: 'The compound is very spacious, peaceful, and clean. Shuttle bus makes going for 7:30 AM lectures effortless.'
      }
    ]
  },
  {
    id: 'ucc-amamoma',
    name: 'Amamoma Royal Student Villa',
    tagline: 'Premium living right beside UCC Old & New Campus gate',
    campusId: 'ucc',
    campusName: 'University of Cape Coast (UCC)',
    address: 'Amamoma Main Road, Opposite UCC West Gate, Cape Coast',
    area: 'Amamoma',
    latitude: 5.1180,
    longitude: -1.2910,
    distanceKm: 0.5,
    walkTimeMins: 6,
    rating: 4.5,
    reviewCount: 142,
    priceMin: 3400,
    priceMax: 7800,
    currency: 'GHS',
    rooms: [
      {
        type: '1-in-a-room',
        title: 'Single Executive (AC)',
        pricePerSemester: 4200,
        pricePerAcademicYear: 7800,
        available: true,
        withAc: true,
        withBathroom: true,
        description: 'Single self-contained with ocean breeze balcony and air conditioner.'
      },
      {
        type: '2-in-a-room',
        title: '2-in-a-Room Ensuite',
        pricePerSemester: 2900,
        pricePerAcademicYear: 5400,
        available: true,
        withAc: false,
        withBathroom: true,
        description: 'Twin room with two full beds and private bathroom.'
      },
      {
        type: '3-in-a-room',
        title: '3-in-a-Room Economy',
        pricePerSemester: 2200,
        pricePerAcademicYear: 4100,
        available: true,
        withAc: false,
        withBathroom: true,
        description: 'Affordable 3 in 1 setup with sturdy study furniture.'
      }
    ],
    amenities: [
      'Standby Generator System',
      'Dual Commercial Water Storage',
      'Free Wireless Internet',
      'Walking Distance to UCC Science Complex',
      'Round the Clock Guarding & CCTV',
      'Shared Kitchenettes on each floor'
    ],
    photos: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '+233 24 551 2288',
    whatsappNumber: '+233245512288',
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
    reviews: [
      {
        id: 'rev-12',
        authorName: 'Ebenezer Quaye',
        rating: 5,
        relativeTimeDescription: '2 weeks ago',
        text: 'Super close to lectures. You can wake up 20 minutes before class and still be early. Security is friendly and strict.'
      }
    ]
  },
  {
    id: 'upsa-yaa-asantewaa',
    name: 'Yaa Asantewaa Prestige Hostel',
    tagline: 'Modern executive student suites next to UPSA campus',
    campusId: 'upsa',
    campusName: 'University of Professional Studies, Accra (UPSA)',
    address: 'Atomic Junction - Madina Link Road, Near UPSA Main Gate, Accra',
    area: 'Atomic / Madina',
    latitude: 5.6590,
    longitude: -0.1668,
    distanceKm: 0.4,
    walkTimeMins: 5,
    rating: 4.4,
    reviewCount: 183,
    priceMin: 4100,
    priceMax: 9000,
    currency: 'GHS',
    rooms: [
      {
        type: '1-in-a-room',
        title: 'Single Executive (Air Conditioned)',
        pricePerSemester: 4800,
        pricePerAcademicYear: 9000,
        available: true,
        withAc: true,
        withBathroom: true,
        description: 'Single room with AC, refrigerator space, and ensuite bathroom.'
      },
      {
        type: '2-in-a-room',
        title: '2-in-a-Room Standard',
        pricePerSemester: 3300,
        pricePerAcademicYear: 6200,
        available: true,
        withAc: true,
        withBathroom: true,
        description: 'Shared room for two professionals/students with dual desks.'
      }
    ],
    amenities: [
      'Automatic Switch Generator',
      'Borehole & High Head Polytank Storage',
      'Ultra Fast Fiber WiFi',
      '2-Minute Walk to UPSA Lecture Halls',
      'Biometric Door Access & Surveillance',
      'On-site Salon and Snack Bar'
    ],
    photos: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '+233 27 889 0011',
    whatsappNumber: '+233278890011',
    googleMapsUrl: 'https://maps.google.com/?q=Hostels+near+UPSA+Madina+Accra',
    googlePlaceId: 'ChIJUPSAHostel009',
    verified: true,
    gender: 'Co-ed',
    isDumsorProof: true,
    hasWaterReserve: true,
    hasFreeShuttle: false,
    hasFreeWifi: true,
    lastUpdated: '2026-11-15T12:00:00Z',
    source: 'google_maps',
    reviews: [
      {
        id: 'rev-13',
        authorName: 'Mary Owusu',
        rating: 5,
        relativeTimeDescription: '1 month ago',
        text: 'The best location for UPSA students. No need for taxis or trotro. Power never fails.'
      }
    ]
  },
  {
    id: 'ashesi-hillside',
    name: 'Berekuso Hillside Residence',
    tagline: 'Quiet scenic student sanctuary overlooking Ashesi hills',
    campusId: 'ashesi',
    campusName: 'Ashesi University',
    address: 'Berekuso Mountain View Road, Berekuso, Eastern Region',
    area: 'Berekuso Hills',
    latitude: 5.7620,
    longitude: -0.2215,
    distanceKm: 0.6,
    walkTimeMins: 7,
    rating: 4.7,
    reviewCount: 94,
    priceMin: 5500,
    priceMax: 12000,
    currency: 'GHS',
    rooms: [
      {
        type: '1-in-a-room',
        title: 'Single Mountain View Studio',
        pricePerSemester: 6500,
        pricePerAcademicYear: 12000,
        available: true,
        withAc: true,
        withBathroom: true,
        description: 'Single suite with private kitchen counter, AC, and mountain view.'
      },
      {
        type: '2-in-a-room',
        title: '2-in-a-Room Suite',
        pricePerSemester: 4200,
        pricePerAcademicYear: 8000,
        available: true,
        withAc: true,
        withBathroom: true,
        description: 'Shared room for two students with individual study cubicles.'
      }
    ],
    amenities: [
      'Solar Microgrid + Backup Generator',
      'Clean Mountain Borehole Water Reserve',
      'Gigabit Fiber Internet Connection',
      'Campus Shuttle Service',
      '24/7 Monitored Security & Patrols',
      'Quiet Study Pods & Outdoor Terraces'
    ],
    photos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80'
    ],
    phoneNumber: '+233 55 443 2190',
    whatsappNumber: '+233554432190',
    googleMapsUrl: 'https://maps.google.com/?q=Ashesi+Hostels+Berekuso',
    googlePlaceId: 'ChIJAshesiHostel010',
    verified: true,
    gender: 'Co-ed',
    isDumsorProof: true,
    hasWaterReserve: true,
    hasFreeShuttle: true,
    hasFreeWifi: true,
    lastUpdated: '2026-11-16T10:00:00Z',
    source: 'google_maps',
    reviews: [
      {
        id: 'rev-14',
        authorName: 'David Boadi',
        rating: 5,
        relativeTimeDescription: '2 weeks ago',
        text: 'The cool mountain weather and fast internet make it the best place to focus on engineering projects.'
      }
    ]
  }
];
