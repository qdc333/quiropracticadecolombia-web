import type { ContactContent, HeroContent } from "@/lib/content";
import type { Mission } from "@/lib/api";
import { getApiUrl } from "@/lib/api";
import { adminHeaders } from "@/lib/auth-client";

async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${getApiUrl()}${path}`, {
    ...init,
    headers: {
      ...adminHeaders(),
      ...(init?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Error de API");
  }
  return res.json() as Promise<T>;
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${getApiUrl()}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al iniciar sesión");
  return data as { token: string; email: string };
}

export function adminGetContent() {
  return adminFetch<{ hero: HeroContent; contact: ContactContent }>("/api/content/admin");
}

export function adminSaveContent(body: object) {
  return adminFetch("/api/content/admin", { method: "PUT", body: JSON.stringify(body) });
}

export function adminGetMissions() {
  return adminFetch<Mission[]>("/api/missions/admin/all");
}

export function adminCreateMission(body: object) {
  return adminFetch<Mission>("/api/missions/admin", { method: "POST", body: JSON.stringify(body) });
}

export function adminUpdateMission(id: string, body: object) {
  return adminFetch<Mission>(`/api/missions/admin/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function adminDeleteMission(id: string) {
  return adminFetch(`/api/missions/admin/${id}`, { method: "DELETE" });
}

export async function adminUploadImage(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  return adminFetch<{ url: string }>("/api/admin/upload", { method: "POST", body: fd });
}
