import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

const envPath = path.join(process.cwd(), ".env.local");
const raw = fs.readFileSync(envPath, "utf8");
const get = (key) => {
  const line = raw.split("\n").find((l) => l.startsWith(`${key}=`));
  if (!line) return "";
  return line.slice(key.length + 1).replace(/^"|"$/g, "");
};

const user = "quiropracticadecolombia_db_user";
const pass = get("MONGODB_URI").match(/\/\/([^:]+):([^@]+)@/)?.[2] ?? "";
const hosts = [
  "ac-fxfeam7-shard-00-00.vabtqng.mongodb.net:27017",
  "ac-fxfeam7-shard-00-01.vabtqng.mongodb.net:27017",
  "ac-fxfeam7-shard-00-02.vabtqng.mongodb.net:27017",
].join(",");
const directUri = `mongodb://${user}:${pass}@${hosts}/?ssl=true&authSource=admin&retryWrites=true&w=majority`;

const uris = [
  { label: "srv (.env.local)", uri: get("MONGODB_URI") },
  { label: "direct (sin SRV)", uri: directUri },
];

for (const { label, uri } of uris) {
  if (!uri) continue;
  try {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
    await client.connect();
    await client.db("quiropractica").command({ ping: 1 });
    console.log(`OK: ${label}`);
    await client.close();
    process.exit(0);
  } catch (e) {
    console.error(`FAIL ${label}:`, e.message);
  }
}
process.exit(1);
