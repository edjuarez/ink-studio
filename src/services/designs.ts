import type { Design } from "../types/api";

export async function getDesigns(
  featured = false,
  limit?: number
): Promise<Design[]> {
  const params = new URLSearchParams();

  if (featured) {
    params.set("featured", "true");
  }

  if (limit) {
    params.set("limit", String(limit));
  }

  const query = params.toString();

  const response = await fetch(
    query ? `/api/designs?${query}` : "/api/designs"
  );

  if (!response.ok) {
    throw new Error("Error fetching designs");
  }

  return response.json();
}