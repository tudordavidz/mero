import { PageProfile, PageReviews } from "../types";

const BASE_URL = "https://mero.ro/api/v2.0";

// Fetch profile data by slug
export async function getProfile(slug: string): Promise<PageProfile | null> {
  try {
    const response = await fetch(`${BASE_URL}/business/page/${slug}/profile`);
    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

// Fetch reviews by pageId with limit for pagination
export async function getReviews(
  pageId: string,
  limit = 5
): Promise<PageReviews | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/mp/pages/${pageId}/reviews?limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return null;
  }
}
