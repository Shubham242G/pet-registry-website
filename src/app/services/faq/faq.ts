// lib/api/faq.ts

import { apiFetch } from '../api';

// ============================================
// TYPES
// ============================================

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  pageId: string;
  category: string;
  order: number;
  isActive: boolean;
  views: number;
  createdBy?: {
    _id: string;
    name: string;
    email: string;
  };
  updatedBy?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FAQFormData {
  question: string;
  answer: string;
  pageId: string;
  category: string;
  order: number;
  isActive: boolean;
}

export interface FAQStats {
  totalFAQs: number;
  activeFAQs: number;
  inactiveFAQs: number;
  totalViews: number;
  pageWiseCount: Array<{
    _id: string;
    count: number;
  }>;
  categoryWiseCount: Array<{
    _id: string;
    count: number;
  }>;
}

export interface FAQFilters {
  pageId?: string;
  category?: string;
  isActive?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type PageOption = {
  value: string;
  label: string;
};

// ============================================
// FAQ API FUNCTIONS
// ============================================

/**
 * Get token from localStorage
 */
const getToken = (): string | undefined => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token') || undefined;
  }
  return undefined;
};

/**
 * Public endpoints - No authentication required
 */

// Get FAQs by page
export const getFAQsByPage = async (pageId: string, limit: number = 20): Promise<APIResponse<FAQ[]>> => {
  return apiFetch<APIResponse<FAQ[]>>(`/faqs/page/${pageId}?limit=${limit}`, 'GET');
};

// Get FAQs by category
export const getFAQsByCategory = async (category: string, pageId?: string): Promise<APIResponse<FAQ[]>> => {
  let url = `/faqs/category/${category}`;
  if (pageId) url += `?pageId=${pageId}`;
  return apiFetch<APIResponse<FAQ[]>>(url, 'GET');
};

// Get all categories
export const getFAQCategories = async (): Promise<APIResponse<string[]>> => {
  return apiFetch<APIResponse<string[]>>('/faqs/categories', 'GET');
};

// Get page options
export const getFAQPageOptions = async (): Promise<APIResponse<PageOption[]>> => {
  return apiFetch<APIResponse<PageOption[]>>('/faqs/page-options', 'GET');
};

/**
 * Admin endpoints - Authentication required
 */

// Get all FAQs with filters (Admin)
export const getFAQs = async (params?: FAQFilters): Promise<PaginatedResponse<FAQ>> => {
  const token = getToken();
  const queryString = params ? new URLSearchParams(params as any).toString() : '';
  const url = `/faqs${queryString ? `?${queryString}` : ''}`;
  return apiFetch<PaginatedResponse<FAQ>>(url, 'GET', undefined, token);
};

// Get FAQ statistics (Admin)
export const getFAQStats = async (): Promise<APIResponse<FAQStats>> => {
  const token = getToken();
  return apiFetch<APIResponse<FAQStats>>('/faqs/stats', 'GET', undefined, token);
};

// Create FAQ (Admin)
export const createFAQ = async (data: FAQFormData): Promise<APIResponse<FAQ>> => {
  const token = getToken();
  return apiFetch<APIResponse<FAQ>>('/faqs', 'POST', data, token);
};

// Update FAQ (Admin)
export const updateFAQ = async (id: string, data: FAQFormData): Promise<APIResponse<FAQ>> => {
  const token = getToken();
  return apiFetch<APIResponse<FAQ>>(`/faqs/${id}`, 'PUT', data, token);
};

// Delete FAQ (Admin)
export const deleteFAQ = async (id: string): Promise<APIResponse<null>> => {
  const token = getToken();
  return apiFetch<APIResponse<null>>(`/faqs/${id}`, 'DELETE', undefined, token);
};

// Bulk delete FAQs (Admin)
export const bulkDeleteFAQs = async (ids: string[]): Promise<APIResponse<{ deletedCount: number }>> => {
  const token = getToken();
  return apiFetch<APIResponse<{ deletedCount: number }>>('/faqs/bulk-delete', 'POST', { ids }, token);
};

// Toggle FAQ status (Admin)
export const toggleFAQStatus = async (id: string): Promise<APIResponse<FAQ>> => {
  const token = getToken();
  return apiFetch<APIResponse<FAQ>>(`/faqs/${id}/toggle`, 'PATCH', undefined, token);
};

// Reorder FAQs (Admin)
export const reorderFAQs = async (pageId: string, orderedIds: string[]): Promise<APIResponse<FAQ[]>> => {
  const token = getToken();
  return apiFetch<APIResponse<FAQ[]>>('/faqs/reorder', 'PUT', { pageId, orderedIds }, token);
};

// ============================================
// EXPORT ALL FUNCTIONS AS A NAMESPACE
// ============================================

export const faqAPI = {
  // Public
  getByPage: getFAQsByPage,
  getByCategory: getFAQsByCategory,
  getCategories: getFAQCategories,
  getPageOptions: getFAQPageOptions,
  
  // Admin
  getAll: getFAQs,
  getStats: getFAQStats,
  create: createFAQ,
  update: updateFAQ,
  delete: deleteFAQ,
  bulkDelete: bulkDeleteFAQs,
  toggleStatus: toggleFAQStatus,
  reorder: reorderFAQs,
};

export default faqAPI;