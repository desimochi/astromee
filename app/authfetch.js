

const API_BASE_URL = "https://webapi.vedastro.org/api/"; // Replace with your API base URL

export async function authFetch(endpoint, options = {}) {

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

//   if (response.status === 401) {
//     console.warn("Access token expired, refreshing...");
//     token = await refreshAccessToken();

//     if (token) {
//       headers.Authorization = `Bearer ${token}`;
//       response = await fetch(`${API_BASE_URL}${endpoint}`, {
//         ...options,
//         headers,
//       });
//     } else {
//       console.error("Session expired. Logging out...");
//       clearTokens();
//       window.location.href = "/login";
//       return;
//     }
//   }

  return response;
}