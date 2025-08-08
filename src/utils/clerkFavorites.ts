import { clerkClient } from "@clerk/backend";

export async function getUserFavorites(userId: string) {
  try {
    const user = await clerkClient.users.getUser(userId);
    return (user.publicMetadata?.favorites as any[]) || [];
  } catch (err) {
    console.error("Get favorites failed:", err);
    return [];
  }
}

export async function updateUserFavorites(userId: string, favorites: any[]) {
  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { favorites },
    });
  } catch (err) {
    console.error("Update favorites failed:", err);
  }
}
