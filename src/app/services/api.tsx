const API = "http://localhost:5000/api";

// In your api.ts file, update the apiFetch function:
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
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}
