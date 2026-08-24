// lib/api/index.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ============================================
// CORE API FETCH FUNCTION
// ============================================

export const apiFetch = async <T = any>(
  endpoint: string,
  method = "GET",
  body?: any,
  token?: string
): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
    credentials: 'include',
  });

  // Handle 401 Unauthorized - clear local storage and cookies
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("loginTime");
      
      // Clear cookies
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
      document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
      
      window.location.href = "/";
    }
    throw new Error("Session expired. Please login again.");
  }

  let data: T | any = {};
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    throw new Error(data?.message || data?.error || "Something went wrong");
  }

  return data;
};

// ============================================
// AUTH API
// ============================================

export const authAPI = {
  login: (data: { email: string; password: string }) => 
    apiFetch('/auth/login', 'POST', data),
  
  register: (data: any) => 
    apiFetch('/auth/register', 'POST', data),
  
  verify: () => 
    apiFetch('/auth/verify', 'GET'),
};

// ============================================
// PETS API
// ============================================

export const petsAPI = {
  getMyPets: () => apiFetch('/pets', 'GET'),
  getPet: (id: string) => apiFetch(`/pets/${id}`, 'GET'),
  create: (data: any) => apiFetch('/pets', 'POST', data),
  update: (id: string, data: any) => apiFetch(`/pets/${id}`, 'PUT', data),
  delete: (id: string) => apiFetch(`/pets/${id}`, 'DELETE'),
};

// ============================================
// REGISTRATION API
// ============================================

export const registrationAPI = {
  getStatus: (petId: string) => 
    apiFetch(`/registration/${petId}/status`, 'GET'),
  
  uploadDocument: (petId: string, documentName: string, fileData: string, fileName: string, fileSize: number, mimeType: string) =>
    apiFetch(`/registration/${petId}/documents`, 'POST', { 
      documentName, 
      fileData, 
      fileName, 
      fileSize, 
      mimeType 
    }),
  
  deleteDocument: (petId: string, documentName: string) =>
    apiFetch(`/registration/${petId}/documents/${documentName}`, 'DELETE'),
  
  triggerRegistration: (petId: string) =>
    apiFetch(`/registration/${petId}/trigger-registration`, 'POST'),
};

// ============================================
// ADMIN API
// ============================================

export const adminAPI = {
  // Dashboard
  getStats: () => apiFetch('/admin/dashboard/stats', 'GET'),
  
  // Customers
  getCustomers: async () => {
    const response = await apiFetch('/admin/customers', 'GET');
    if (response && response.customers) {
      return response.customers;
    }
    return Array.isArray(response) ? response : [];
  },
  getCustomer: (id: string) => apiFetch(`/admin/customers/${id}`, 'GET'),
  
  // Pets
  getPets: async () => {
    const response = await apiFetch('/admin/pets', 'GET');
    if (response && response.pets) {
      return response.pets;
    }
    return Array.isArray(response) ? response : [];
  },
  getPet: (id: string) => apiFetch(`/admin/pets/${id}`, 'GET'),
  
  // Registrations
  getRegistrations: async () => {
    const response = await apiFetch('/admin/registrations', 'GET');
    if (response && response.registrations) {
      return response.registrations;
    }
    return Array.isArray(response) ? response : [];
  },
  getRegistration: (id: string) => apiFetch(`/admin/registrations/${id}`, 'GET'),
  
  // Registration Management
  updateRegistrationStage: (petId: string, stage: number) =>
    apiFetch(`/admin/pets/${petId}/registration-stage`, 'PUT', { stage }),
  
  // License Management
  issueLicense: (petId: string, licenseData: any) =>
    apiFetch(`/admin/pets/${petId}/license`, 'POST', licenseData),
  getLicense: (petId: string) => apiFetch(`/admin/pets/${petId}/license`, 'GET'),
  
  // Documents
  getPendingDocuments: async () => {
    const response = await apiFetch('/admin/documents/pending', 'GET');
    return Array.isArray(response) ? response : [];
  },
  getRegistrationDocuments: (registrationId: string) =>
    apiFetch(`/admin/registrations/${registrationId}/documents`, 'GET'),
};

// ============================================
// FAQ API (Import from separate file or define here)
// ============================================

// Option 1: Export from separate file
export * from './faq/faq';

// Option 2: Or define FAQ functions here (if you want everything in one file)
// For clarity, I recommend keeping them in a separate file and exporting here

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
  apiFetch,
  auth: authAPI,
  pets: petsAPI,
  registration: registrationAPI,
  admin: adminAPI,
};