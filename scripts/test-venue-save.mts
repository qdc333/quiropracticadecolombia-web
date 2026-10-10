import fs from "fs";
import { getSiteContent, saveSiteContent } from "../lib/cms/repository.ts";

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

async function main() {
  loadEnvLocal();
  const c = await getSiteContent();
  const missions = structuredClone(c.misiones.missions);
  const idx = missions.findIndex((x) => x.id === "mision-iglesia");
  if (idx < 0) {
    console.error("no mision-iglesia");
    process.exit(1);
  }
  missions[idx] = {
    ...missions[idx],
    venuePhotos: missions[idx].venuePhotos.map((p, i) =>
      i === 0 ? { src: "/images/cms/test-venue-script.png", alt: "script test" } : p,
    ),
  };
  const saved = await saveSiteContent({
    ...c,
    misiones: { ...c.misiones, missions },
  });
  const ig = saved.misiones.missions.find((x) => x.id === "mision-iglesia");
  console.log("after save venuePhotos[0]:", ig?.venuePhotos?.[0]);

  const again = await getSiteContent();
  const ig2 = again.misiones.missions.find((x) => x.id === "mision-iglesia");
  console.log("after read venuePhotos[0]:", ig2?.venuePhotos?.[0]);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
