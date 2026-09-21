import type { Print } from "../types/api";

export async function getPrints(
  featured = false,
  limit?: number
): Promise<Print[]> {
  const params = new URLSearchParams();

  if (featured) {
    params.set("featured", "true");
  }

  if (limit) {
    params.set("limit", String(limit));
  }

  const query = params.toString();

  const response = await fetch(
    query ? `/api/prints?${query}` : "/api/prints"
  );

  if (!response.ok) {
    throw new Error("Error fetching prints");
  }

  return response.json();
}