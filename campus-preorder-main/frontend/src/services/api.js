const rawBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const API = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

const request = async (url, options = {}) => {
  const response = await fetch(`${API}${url}`, options);
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}`);
  }

  return data;
};

export const get = (url, { token } = {}) =>
  request(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

export const post = (url, data, { token } = {}) =>
  request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
