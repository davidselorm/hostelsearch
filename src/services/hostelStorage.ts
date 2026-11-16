import { Hostel, ReviewItem } from '../types/hostel';
import { INITIAL_HOSTELS } from '../data/seedHostels';

const STORAGE_KEY = 'hostelsearch_hostels_v1';
const BOOKMARKS_KEY = 'hostelsearch_bookmarks_v1';
const API_KEY_STORAGE = 'hostelsearch_gmaps_api_key';

export function getStoredApiKey(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(API_KEY_STORAGE) || '';
}

export function setStoredApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(API_KEY_STORAGE, key.trim());
}

export function getAllHostels(): Hostel[] {
  if (typeof window === 'undefined') return INITIAL_HOSTELS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_HOSTELS));
      return INITIAL_HOSTELS;
    }
    const parsed: Hostel[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_HOSTELS));
      return INITIAL_HOSTELS;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to read hostels from localStorage:', err);
    return INITIAL_HOSTELS;
  }
}

export function saveAllHostels(hostels: Hostel[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hostels));
  } catch (err) {
    console.error('Failed to save hostels to localStorage:', err);
  }
}

export function mergeImportedHostels(newHostels: Hostel[]): { added: number; updated: number; total: number } {
  const current = getAllHostels();
  const currentMap = new Map(current.map(h => [h.name.toLowerCase().trim(), h]));

  let added = 0;
  let updated = 0;

  for (const item of newHostels) {
    const key = item.name.toLowerCase().trim();
    if (currentMap.has(key)) {
      // Update existing
      const existing = currentMap.get(key)!;
      currentMap.set(key, {
        ...existing,
        rating: item.rating || existing.rating,
        reviewCount: Math.max(existing.reviewCount, item.reviewCount),
        address: item.address || existing.address,
        phoneNumber: item.phoneNumber || existing.phoneNumber,
        googleMapsUrl: item.googleMapsUrl || existing.googleMapsUrl,
        lastUpdated: new Date().toISOString()
      });
      updated++;
    } else {
      // Add new
      currentMap.set(key, item);
      added++;
    }
  }

  const merged = Array.from(currentMap.values());
  saveAllHostels(merged);

  return { added, updated, total: merged.length };
}

export function getHostelById(id: string): Hostel | undefined {
  const all = getAllHostels();
  return all.find(h => h.id === id);
}

export function addHostelReview(hostelId: string, review: Omit<ReviewItem, 'id'>): Hostel | null {
  const all = getAllHostels();
  const index = all.findIndex(h => h.id === hostelId);
  if (index === -1) return null;

  const target = all[index];
  const newReviewItem: ReviewItem = {
    id: `user-rev-${Date.now()}`,
    ...review
  };

  const updatedReviews = [newReviewItem, ...target.reviews];
  const newCount = target.reviewCount + 1;
  const newRating = parseFloat(
    ((target.rating * target.reviewCount + review.rating) / newCount).toFixed(1)
  );

  const updatedHostel: Hostel = {
    ...target,
    reviews: updatedReviews,
    rating: newRating,
    reviewCount: newCount,
    lastUpdated: new Date().toISOString()
  };

  all[index] = updatedHostel;
  saveAllHostels(all);
  return updatedHostel;
}

export function getBookmarkedIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleBookmarkId(id: string): boolean {
  if (typeof window === 'undefined') return false;
  const current = getBookmarkedIds();
  let updated: string[];
  let isBookmarked: boolean;

  if (current.includes(id)) {
    updated = current.filter(x => x !== id);
    isBookmarked = false;
  } else {
    updated = [...current, id];
    isBookmarked = true;
  }

  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  return isBookmarked;
}

export function resetHostelsToDefault(): Hostel[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_HOSTELS));
  }
  return INITIAL_HOSTELS;
}
