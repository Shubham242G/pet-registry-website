const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

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