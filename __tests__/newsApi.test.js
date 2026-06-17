import {
  fetchTopHeadlines,
  searchArticles,
  NewsApiError,
} from "../src/services/newsApi";

const mockArticle = {
  source: { id: "test", name: "Test Source" },
  author: "Test Author",
  title: "Test Title",
  description: "Test description",
  url: "https://example.com/article",
  urlToImage: null,
  publishedAt: "2024-01-01T00:00:00Z",
  content: "Test content",
};

const mockResponse = { status: "ok", totalResults: 1, articles: [mockArticle] };

global.fetch = jest.fn();

describe("newsApi", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("fetchTopHeadlines", () => {
    it("debe retornar artículos correctamente", async () => {
      fetch.mockResolvedValueOnce({ ok: true, json: async () => mockResponse });
      const articles = await fetchTopHeadlines("technology");
      expect(articles).toHaveLength(1);
      expect(articles[0].title).toBe("Test Title");
    });

    it("debe filtrar artículos con título [Removed]", async () => {
      const removed = {
        ...mockResponse,
        articles: [{ ...mockArticle, title: "[Removed]" }],
      };
      fetch.mockResolvedValueOnce({ ok: true, json: async () => removed });
      const articles = await fetchTopHeadlines("general");
      expect(articles).toHaveLength(0);
    });

    it("debe lanzar NewsApiError cuando el fetch falla", async () => {
      fetch.mockResolvedValueOnce({ ok: false, status: 401 });
      await expect(fetchTopHeadlines("sports")).rejects.toThrow(NewsApiError);
    });
  });

  describe("searchArticles", () => {
    it("debe buscar artículos correctamente", async () => {
      fetch.mockResolvedValueOnce({ ok: true, json: async () => mockResponse });
      const articles = await searchArticles("react native");
      expect(articles).toHaveLength(1);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("react%20native"),
      );
    });

    it("debe lanzar NewsApiError cuando la búsqueda falla", async () => {
      fetch.mockResolvedValueOnce({ ok: false, status: 500 });
      await expect(searchArticles("test")).rejects.toThrow(NewsApiError);
    });
  });
});
