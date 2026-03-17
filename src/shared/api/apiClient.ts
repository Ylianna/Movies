const API_KEY = "d2a8620a";
const BASE_URL = "https://www.omdbapi.com/";

export const apiClient = async (endpoint: string) => {
  const url = new URL(BASE_URL);
  const query = endpoint.startsWith("?") ? endpoint.slice(1) : endpoint.replace(/^[/?]/, "");
  url.search = query;
  url.searchParams.set("apikey", API_KEY);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Ошибка запроса");
  }

  return res.json();
};