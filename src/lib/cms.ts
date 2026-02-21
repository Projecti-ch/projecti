import { cache } from 'react';
import type { Project, Update, Media } from '@/types/cms';

// Server-only CMS URL (not exposed to client bundle)
const CMS_URL = process.env.CMS_URL || process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000';

// CMS Response wrapper
export interface CMSResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface FetchOptions {
  /** Depth of relationship population (default: 1) */
  depth?: number;
  /** Maximum items to fetch (default: 10) */
  limit?: number;
  /** Page number for pagination */
  page?: number;
  /** Sort field and direction (prefix with - for descending) */
  sort?: string;
  /** Include drafts (default: false, only gets published) */
  draft?: boolean;
  /** Additional where query parameters */
  where?: Record<string, unknown>;
}

/**
 * Generic fetch function for CMS collections
 */
async function fetchCollection<T>(
  collection: string,
  options: FetchOptions = {}
): Promise<CMSResponse<T>> {
  const {
    depth = 1,
    limit = 10,
    page = 1,
    sort = '-createdAt',
    draft = false,
    where = {},
  } = options;

  // Build query params
  const params = new URLSearchParams({
    depth: String(depth),
    limit: String(limit),
    page: String(page),
    sort,
  });

  // Only fetch published items (unless drafts requested)
  if (!draft) {
    params.append('where[_status][equals]', 'published');
  }

  // Add additional where clauses
  // Keys should be field names, values are what to match (equals)
  Object.entries(where).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(`where[${key}][equals]`, String(value));
    }
  });

  const url = `${CMS_URL}/api/${collection}?${params.toString()}`;

  const response = await fetch(url, {
    next: {
      // Revalidate every 60 seconds (ISR)
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${collection}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch a single document by slug
 */
async function fetchBySlug<T>(
  collection: string,
  slug: string,
  options: Omit<FetchOptions, 'where' | 'limit'> = {}
): Promise<T | null> {
  const response = await fetchCollection<T>(collection, {
    ...options,
    limit: 1,
    where: { slug },
  });

  return response.docs[0] || null;
}

// ============================================
// Projects API
// ============================================

export async function getProjects(options?: FetchOptions): Promise<CMSResponse<Project>> {
  return fetchCollection<Project>('projects', {
    sort: '-date',
    ...options,
  });
}

export const getFeaturedProjects = cache(async (limit = 4): Promise<Project[]> => {
  const response = await fetchCollection<Project>('projects', {
    limit,
    sort: '-date',
    where: { featured: 'true' },
  });
  return response.docs;
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  return fetchBySlug<Project>('projects', slug, { depth: 2 });
});

export async function getProjectsByCategory(
  category: Project['category'],
  options?: Omit<FetchOptions, 'where'>
): Promise<CMSResponse<Project>> {
  return fetchCollection<Project>('projects', {
    ...options,
    where: { category },
  });
}

// ============================================
// Updates API
// ============================================

export async function getUpdates(options?: FetchOptions): Promise<CMSResponse<Update>> {
  return fetchCollection<Update>('updates', {
    sort: '-date',
    ...options,
  });
}

export const getUpdateBySlug = cache(async (slug: string): Promise<Update | null> => {
  return fetchBySlug<Update>('updates', slug, { depth: 2 });
});

// ============================================
// Utility functions
// ============================================

/**
 * Extract the URL from a media field (handles both populated and ID-only cases)
 * Handles relative URLs from CMS by prepending CMS_URL
 */
export function getMediaUrl(
  media: Project['heroImage'] | Update['featuredImage'],
  size: 'thumbnail' | 'card' | 'hero' = 'card'
): string | null {
  if (!media || typeof media === 'number') {
    return null;
  }

  const mediaObj = media as Media;
  // Try to get the specific size, fall back to main URL
  const sizedUrl = mediaObj.sizes?.[size]?.url;
  const url = sizedUrl || mediaObj.url || null;

  if (!url) return null;

  // Handle relative URLs from CMS (when R2_PUBLIC_URL is not configured)
  if (url.startsWith('/')) {
    return `${CMS_URL}${url}`;
  }

  return url;
}

/**
 * Format a date string to German locale
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '';
  
  return new Date(dateString).toLocaleDateString('de-CH', {
    year: 'numeric',
    month: 'long',
  });
}

// Category display mapping
export const categoryLabels: Record<Project['category'], string> = {
  planung: 'Planung',
  analyse: 'Digitale Lösungen',
};
