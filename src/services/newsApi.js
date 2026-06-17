const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY ?? "";
const BASE_URL = "https://newsapi.org/v2";

export class NewsApiError extends Error {
  constructor(message) {
    super(message);
    this.name = "NewsApiError";
  }
}

export const fetchTopHeadlines = async (category) => {
  const url = `${BASE_URL}/everything?q=${encodeURIComponent(category)}&language=es&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new NewsApiError(`Error al obtener noticias: ${response.status}`);
  }
  const data = await response.json();
  if (data.status !== "ok") {
    throw new NewsApiError("La API devolvió un error");
  }
  return data.articles.filter((a) => a.title !== "[Removed]");
};

export const searchArticles = async (query) => {
  const url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=20&language=es&apiKey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new NewsApiError(`Error en la búsqueda: ${response.status}`);
  }
  const data = await response.json();
  if (data.status !== "ok") {
    throw new NewsApiError("La API devolvió un error");
  }
  return data.articles.filter((a) => a.title !== "[Removed]");
};
