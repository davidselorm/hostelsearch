import { Campus } from '../types/hostel';

export const CAMPUSES: Campus[] = [
  {
    id: 'all',
    name: 'All Campuses & Cities',
    shortName: 'All Locations',
    city: 'Ghana Nationwide',
    center: {
      lat: 5.6506,
      lng: -0.1870
    },
    radiusKm: 50,
    popularAreas: ['Legon', 'Ayeduase', 'Amamoma', 'Madina', 'Kotei', 'West Legon', 'Gaza', 'Atomic'],
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ug-legon',
    name: 'University of Ghana (UG Legon)',
    shortName: 'UG Legon',
    city: 'Accra',
    center: {
      lat: 5.6506,
      lng: -0.1870
    },
    radiusKm: 6.5,
    popularAreas: ['Legon Campus', 'Haatso', 'Atomic Junction', 'West Legon', 'Madina', 'Agogba'],
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'knust',
    name: 'Kwame Nkrumah University of Science & Technology (KNUST)',
    shortName: 'KNUST',
    city: 'Kumasi',
    center: {
      lat: 6.6745,
      lng: -1.5716
    },
    radiusKm: 7.0,
    popularAreas: ['Ayeduase', 'Kotei', 'Gaza Area', 'Boadi', 'Kentinkrono', 'Bomso'],
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ucc',
    name: 'University of Cape Coast (UCC)',
    shortName: 'UCC',
    city: 'Cape Coast',
    center: {
      lat: 5.1155,
      lng: -1.2884
    },
    radiusKm: 5.5,
    popularAreas: ['Amamoma', 'Apewosika', 'Kwaprow', 'Ayensu', 'Science Area'],
    imageUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'upsa',
    name: 'University of Professional Studies, Accra (UPSA)',
    shortName: 'UPSA',
    city: 'Accra',
    center: {
      lat: 5.6568,
      lng: -0.1652
    },
    radiusKm: 4.5,
    popularAreas: ['Atomic', 'Madina Zongo Junction', 'Legon Ext', 'East Legon'],
    imageUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ashesi',
    name: 'Ashesi University',
    shortName: 'Ashesi',
    city: 'Berekuso, Eastern Region',
    center: {
      lat: 5.7597,
      lng: -0.2198
    },
    radiusKm: 5.0,
    popularAreas: ['Berekuso Township', 'Kitase', 'Brekuso Hills'],
    imageUrl: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'atu',
    name: 'Accra Technical University (ATU)',
    shortName: 'ATU',
    city: 'Accra Central',
    center: {
      lat: 5.5560,
      lng: -0.2050
    },
    radiusKm: 5.0,
    popularAreas: ['Tudu', 'Adabraka', 'Kinbu', 'Ridge'],
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=600&auto=format&fit=crop&q=80'
  }
];
