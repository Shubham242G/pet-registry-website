// utils/api.ts
import { logger } from '../../../utils/logger';

// utils/api.ts - Add token expiration handling
export async function apiFetch(endpoint: string, method: string = "GET", body: any = null, token?: string) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, config);
    
    // Handle 401 Unauthorized - Token expired
    if (response.status === 401) {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Redirect to home page
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
      throw new Error("Session expired. Please login again.");
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      logger.error("API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    logger.error("API Fetch Error:", error);
    throw error;
  }
}