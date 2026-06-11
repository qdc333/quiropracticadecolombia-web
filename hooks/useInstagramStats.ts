"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

type IgStats = {
  "clinic-followers": string;
  "clinic-posts": string;
  "clinic-following": string;
  "doctor-followers": string;
  "doctor-posts": string;
  "doctor-following": string;
};

function formatIgNumber(n: number | null) {
  if (n == null || Number.isNaN(Number(n))) return "Ver perfil";
  return Number(n).toLocaleString("es-CO");
}

export function useInstagramStats() {
  const [stats, setStats] = useState<IgStats>({
    "clinic-followers": "…",
    "clinic-posts": "…",
    "clinic-following": "…",
    "doctor-followers": "…",
    "doctor-posts": "…",
    "doctor-following": "…",
  });

  useEffect(() => {
    async function fetchProfile(username: string) {
      const res = await fetch(
        `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
        {
          headers: {
            "X-IG-App-ID": "936619743392459",
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );
      if (!res.ok) throw new Error(`IG ${res.status}`);
      const data = await res.json();
      const user = data?.data?.user;
      if (!user) throw new Error("Sin datos");
      return {
        followers: user.edge_followed_by?.count ?? null,
        posts: user.edge_owner_to_timeline_media?.count ?? null,
        following: user.edge_follow?.count ?? null,
      };
    }

    async function load() {
      const next = { ...stats };

      for (const [key, username] of [
        ["clinic", SITE.instagram.clinic.username],
        ["doctor", SITE.instagram.doctor.username],
      ] as const) {
        try {
          const data = await fetchProfile(username);
          next[`${key}-followers` as keyof IgStats] = formatIgNumber(data.followers);
          next[`${key}-posts` as keyof IgStats] = formatIgNumber(data.posts);
          next[`${key}-following` as keyof IgStats] = formatIgNumber(data.following);
        } catch {
          next[`${key}-followers` as keyof IgStats] = formatIgNumber(null);
          next[`${key}-posts` as keyof IgStats] = formatIgNumber(null);
          next[`${key}-following` as keyof IgStats] = formatIgNumber(null);
        }
      }

      setStats(next);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return stats;
}
