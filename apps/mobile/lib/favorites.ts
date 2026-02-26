import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "kinservices_favoris";

export async function getFavorites(): Promise<string[]> {
  try {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to get favorites:", error);
    return [];
  }
}

export async function addFavorite(id: string): Promise<void> {
  try {
    const favorites = await getFavorites();
    if (!favorites.includes(id)) {
      favorites.push(id);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error("Failed to add favorite:", error);
  }
}

export async function removeFavorite(id: string): Promise<void> {
  try {
    const favorites = await getFavorites();
    const filtered = favorites.filter((fid) => fid !== id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Failed to remove favorite:", error);
  }
}

export async function isFavorite(id: string): Promise<boolean> {
  try {
    const favorites = await getFavorites();
    return favorites.includes(id);
  } catch (error) {
    console.error("Failed to check favorite:", error);
    return false;
  }
}

export async function clearFavorites(): Promise<void> {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error("Failed to clear favorites:", error);
  }
}
