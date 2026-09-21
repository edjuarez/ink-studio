import type { Tattoo } from "../types/api";

export async function getTattoos(
  featured = false,
  limit?: number
): Promise<Tattoo[]> {
  const params = new URLSearchParams();

  if (featured) {
    params.set("featured", "true");
  }

  if (limit) {
    params.set("limit", String(limit));
  }

  const response = await fetch(`/api/tattoos?${params}`);

  if (!response.ok) {
    throw new Error("Error fetching tattoos");
  }

  return response.json();
}