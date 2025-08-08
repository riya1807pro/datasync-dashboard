// src/utils/userFavorites.ts
export function getUserLocalFavorites(userId?: string) {
  if (typeof window === 'undefined' || !userId) return []
  try {
    const raw = localStorage.getItem(`favorites_${userId}`)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('getUserLocalFavorites parse error', e)
    return []
  }
}

export function setUserLocalFavorites(userId: string | undefined, favorites: any[]) {
  if (typeof window === 'undefined' || !userId) return
  try {
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites))
  } catch (e) {
    console.error('setUserLocalFavorites error', e)
  }
}
