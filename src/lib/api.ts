/**
 * API Service Layer
 * Centralized API communication with typed responses and error handling
 */

import type {
  Template,
  Category,
  Industry,
  PaginatedResponse,
  QueryFilters,
  ApiResponse,
} from '../../../shared/types/index.js';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 30000; // 30 seconds (increased to handle slow database queries)

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Make HTTP request with timeout and error handling
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.error || `HTTP ${response.status}: ${response.statusText}`,
        new Error(`API request failed: ${url}`)
      );
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(
        408,
        'Request timeout - API server not responding',
        error
      );
    }

    throw new ApiError(
      500,
      'Network error - Unable to connect to API',
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

/**
 * Build query string from filters
 */
function buildQueryString(filters: QueryFilters): string {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Get all templates with optional filters
 */
export async function getTemplates(
  filters: QueryFilters = {}
): Promise<PaginatedResponse<Template>> {
  const queryString = buildQueryString(filters);
  const url = `${API_BASE_URL}/templates${queryString}`;

  try {
    const response = await fetchWithTimeout(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch templates:', error);
    throw error;
  }
}

/**
 * Get single template by slug
 */
export async function getTemplateBySlug(
  slug: string
): Promise<ApiResponse<Template>> {
  const url = `${API_BASE_URL}/templates/${slug}`;

  try {
    const response = await fetchWithTimeout(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch template ${slug}:`, error);
    throw error;
  }
}

/**
 * Search templates
 */
export async function searchTemplates(
  query: string,
  filters: QueryFilters = {}
): Promise<PaginatedResponse<Template>> {
  const searchFilters = { ...filters, search: query };
  return getTemplates(searchFilters);
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<Category[]> {
  const url = `${API_BASE_URL}/categories`;

  try {
    const response = await fetchWithTimeout(url);
    const data = await response.json();
    // API might return paginated or simple array response
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
}

/**
 * Get single category by slug
 */
export async function getCategoryBySlug(
  slug: string
): Promise<ApiResponse<Category>> {
  const url = `${API_BASE_URL}/categories/${slug}`;

  try {
    const response = await fetchWithTimeout(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch category ${slug}:`, error);
    throw error;
  }
}

/**
 * Get all industries
 */
export async function getIndustries(): Promise<Industry[]> {
  const url = `${API_BASE_URL}/industries`;

  try {
    const response = await fetchWithTimeout(url);
    const data = await response.json();
    // API might return paginated or simple array response
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error('Failed to fetch industries:', error);
    throw error;
  }
}

/**
 * Get single industry by slug
 */
export async function getIndustryBySlug(
  slug: string
): Promise<ApiResponse<Industry>> {
  const url = `${API_BASE_URL}/industries/${slug}`;

  try {
    const response = await fetchWithTimeout(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch industry ${slug}:`, error);
    throw error;
  }
}

/**
 * Increment template view count
 */
export async function incrementTemplateViews(
  templateId: number
): Promise<void> {
  const url = `${API_BASE_URL}/templates/${templateId}/views`;

  try {
    await fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Don't throw on view increment - this is non-critical
    console.warn('Failed to increment template views:', error);
  }
}

/**
 * Increment template download count
 */
export async function incrementTemplateDownloads(
  templateId: number
): Promise<void> {
  const url = `${API_BASE_URL}/templates/${templateId}/downloads`;

  try {
    await fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Don't throw on download increment - this is non-critical
    console.warn('Failed to increment template downloads:', error);
  }
}

/**
 * Simple in-memory cache for API responses
 */
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

const cache = new Map<string, CacheEntry<any>>();

/**
 * Get cached data if valid
 */
export function getCachedData<T>(key: string): T | null {
  const entry = cache.get(key);

  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > entry.ttl;
  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return entry.data as T;
}

/**
 * Set cache data
 */
export function setCacheData<T>(
  key: string,
  data: T,
  ttl: number = 5 * 60 * 1000 // 5 minutes default
): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
}

/**
 * Clear specific cache entry
 */
export function clearCache(key: string): void {
  cache.delete(key);
}

/**
 * Clear all cache
 */
export function clearAllCache(): void {
  cache.clear();
}

/**
 * Check API health
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const url = `${API_BASE_URL}/health`;
    const response = await fetchWithTimeout(url);
    return response.ok;
  } catch {
    return false;
  }
}
