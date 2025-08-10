// src/utils/userFavorites.ts
export const getUserLocalFavorites = (userId?: string) => {
  if (typeof window === 'undefined' || !userId) return []
  try {
    const raw = localStorage.getItem(`favorites_${userId}`)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const setUserLocalFavorites = (userId: string | undefined, favs: any[]) => {
  if (typeof window === 'undefined' || !userId) return
  try {
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(favs))
  } catch {}
}
