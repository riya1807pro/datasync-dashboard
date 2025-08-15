
import { getUserLocalFavorites, setUserLocalFavorites } from "./userFavorites";

export async function getUserFavorites(userId: string) {
  try {
    return getUserLocalFavorites(userId);
  } catch (err) {
    console.error("Get favorites failed:", err);
    return [];
  }
}


export async function updateUserFavorites(userId: string, favorites: any[]) {
  try {
    setUserLocalFavorites(userId, favorites);
  } catch (err) {
    console.error("Update favorites failed:", err);
  }
}