import { getSiteContent } from "../lib/cms/repository.ts";
import { mergeSiteContent } from "../lib/cms/merge-content.ts";
import fs from "fs";

function loadEnvLocal() {
  const raw = fs.readFileSync(".env.local", "utf8");
  for (const line of raw.split("\n")) {
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();
const c = await getSiteContent();
const missions = structuredClone(c.misiones.missions);
const idx = missions.findIndex((x) => x.id === "mision-iglesia");
missions[idx].venuePhotos[0] = { src: "/images/cms/test-venue.png", alt: "test" };

const payload = { ...c, misiones: { ...c.misiones, missions } };
const merged = mergeSiteContent(payload);
const ig = merged.misiones.missions.find((x) => x.id === "mision-iglesia");
console.log("merged venue[0]", ig?.venuePhotos?.[0]);
console.log("mission count", merged.misiones.missions.length);
