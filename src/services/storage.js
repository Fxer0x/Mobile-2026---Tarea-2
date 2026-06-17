import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@news_favorites";

export const getFavorites = async () => {
  const json = await AsyncStorage.getItem(FAVORITES_KEY);
  return json ? JSON.parse(json) : [];
};

export const addFavorite = async (article) => {
  const favorites = await getFavorites();
  const alreadySaved = favorites.some((a) => a.url === article.url);
  if (!alreadySaved) {
    await AsyncStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify([...favorites, article]),
    );
  }
};

export const removeFavorite = async (articleUrl) => {
  const favorites = await getFavorites();
  const updated = favorites.filter((a) => a.url !== articleUrl);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

export const isFavorite = async (articleUrl) => {
  const favorites = await getFavorites();
  return favorites.some((a) => a.url === articleUrl);
};
