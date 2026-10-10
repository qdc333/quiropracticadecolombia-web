import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_SITE_CONTENT } from "@/lib/cms/defaults";
import { mergeSiteContent } from "@/lib/cms/merge-content";
import type { SiteContent } from "@/lib/cms/types";

const COLLECTION = "site";
const DOC_ID = "content";
const LOCAL_FILE = path.join(process.cwd(), "content", "site-content.json");

type MongoDoc = SiteContent & { _id: string };

let clientPromise: Promise<import("mongodb").MongoClient | null> | null = null;

async function getMongoClient() {
  const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;
  if (!uri) return null;

  if (!clientPromise) {
    clientPromise = (async () => {
      try {
        const { MongoClient } = await import("mongodb");
        const client = new MongoClient(uri, { serverSelectionTimeoutMS: 4000 });
        await client.connect();
        return client;
      } catch {
        clientPromise = null;
        return null;
      }
    })();
  }

  return clientPromise;
}

function stripMongoDoc(doc: MongoDoc | null): Partial<SiteContent> | null {
  if (!doc) return null;
  const { _id: _ignored, ...rest } = doc;
  return rest;
}

const mergeWithDefaults = mergeSiteContent;

async function readLocalContent(): Promise<SiteContent | null> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf8");
    return mergeWithDefaults(JSON.parse(raw) as SiteContent);
  } catch {
    return null;
  }
}

async function writeLocalContent(content: SiteContent) {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(content, null, 2), "utf8");
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const client = await getMongoClient();

    if (client) {
      const dbName = process.env.MONGODB_DB || "quiropractica";
      const doc = await client.db(dbName).collection<MongoDoc>(COLLECTION).findOne({ _id: DOC_ID });
      const payload = stripMongoDoc(doc);
      if (payload) return mergeWithDefaults(payload);
    }
  } catch {
    /* Mongo no disponible: usar archivo local o defaults */
  }

  const local = await readLocalContent();
  return local ?? structuredClone(DEFAULT_SITE_CONTENT);
}

export async function saveSiteContent(content: SiteContent): Promise<SiteContent> {
  const merged = mergeWithDefaults(content) as SiteContent & { vision?: unknown };
  delete merged.vision;

  const next: SiteContent = {
    ...merged,
    version: (content.version || DEFAULT_SITE_CONTENT.version) + 1,
    updatedAt: new Date().toISOString(),
  };

  try {
    const client = await getMongoClient();

    if (client) {
      const dbName = process.env.MONGODB_DB || "quiropractica";
      await client
        .db(dbName)
        .collection<MongoDoc>(COLLECTION)
        .updateOne({ _id: DOC_ID }, { $set: { ...next, _id: DOC_ID } }, { upsert: true });
      return next;
    }
  } catch {
    /* guardar en archivo local */
  }

  await writeLocalContent(next);
  return next;
}
