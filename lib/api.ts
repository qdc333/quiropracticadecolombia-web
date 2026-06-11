import { DEFAULT_CONTACT, DEFAULT_HERO, type ContactContent, type HeroContent } from "@/lib/content";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export type Mission = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  priceCents: number;
  currency: string;
  imageUrl: string | null;
  badge: string | null;
  dateLabel: string | null;
  active: boolean;
  sortOrder: number;
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalCents: number;
  currency: string;
  status: string;
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Error de API");
  }
  return res.json() as Promise<T>;
}

export async function getPublicContent() {
  if (USE_MOCK) return { hero: DEFAULT_HERO, contact: DEFAULT_CONTACT };
  return apiFetch<{ hero: HeroContent; contact: ContactContent }>("/api/content/public");
}

export async function getMissions(limit?: number) {
  if (USE_MOCK) return [] as Mission[];
  const missions = await apiFetch<Mission[]>("/api/missions");
  return limit ? missions.slice(0, limit) : missions;
}

export async function getMissionBySlug(slug: string) {
  if (USE_MOCK) return null;
  try {
    return await apiFetch<Mission>(`/api/missions/${slug}`);
  } catch {
    return null;
  }
}

export async function getOrder(id: string) {
  if (USE_MOCK) return null;
  try {
    return await apiFetch<Order>(`/api/checkout/orders/${id}`);
  } catch {
    return null;
  }
}

export function getApiUrl() {
  return API;
}

export function isMockMode() {
  return USE_MOCK;
}
