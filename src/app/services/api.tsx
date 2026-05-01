// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// export const apiFetch = async <T = any>(
//   endpoint: string,
//   method = "GET",
//   body?: any,
//   token?: string
// ): Promise<T> => {
//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//     },
//     ...(body && { body: JSON.stringify(body) }),
//   });

//   let data: T | any = {};
//   try {
//     data = await res.json();
//   } catch {}

//   if (!res.ok) {
//     throw new Error(data?.error || "Something went wrong");
//   }

//   return data;
// };

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
    // Important for cross-domain requests
    credentials: 'include',
  });

  let data: T | any = {};
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    throw new Error(data?.message || data?.error || "Something went wrong");
  }

  return data;
};