import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
} from "../src/services/storage";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

const mockArticle = {
  source: { id: null, name: "BBC News" },
  author: "Jane Doe",
  title: "Artículo de prueba",
  description: "Descripción de prueba",
  url: "https://bbc.com/article-1",
  urlToImage: null,
  publishedAt: "2024-06-01T12:00:00Z",
  content: null,
};

describe("storage service", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it("getFavorites retorna array vacío si no hay favoritos", async () => {
    expect(await getFavorites()).toEqual([]);
  });

  it("addFavorite guarda un artículo", async () => {
    await addFavorite(mockArticle);
    const favs = await getFavorites();
    expect(favs).toHaveLength(1);
    expect(favs[0].url).toBe(mockArticle.url);
  });

  it("addFavorite no duplica artículos", async () => {
    await addFavorite(mockArticle);
    await addFavorite(mockArticle);
    expect(await getFavorites()).toHaveLength(1);
  });

  it("removeFavorite elimina el artículo correcto", async () => {
    await addFavorite(mockArticle);
    await removeFavorite(mockArticle.url);
    expect(await getFavorites()).toHaveLength(0);
  });

  it("isFavorite retorna true si está guardado", async () => {
    await addFavorite(mockArticle);
    expect(await isFavorite(mockArticle.url)).toBe(true);
  });

  it("isFavorite retorna false si no está guardado", async () => {
    expect(await isFavorite("https://no-existe.com")).toBe(false);
  });
});
