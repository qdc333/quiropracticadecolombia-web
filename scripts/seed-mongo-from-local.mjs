import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

const envPath = path.join(process.cwd(), ".env.local");
const raw = fs.readFileSync(envPath, "utf8");
const uri = raw
  .split("\n")
  .find((l) => l.startsWith("MONGODB_URI="))
  ?.slice("MONGODB_URI=".length)
  .replace(/^"|"$/g, "");
const dbName =
  raw
    .split("\n")
    .find((l) => l.startsWith("MONGODB_DB="))
    ?.slice("MONGODB_DB=".length)
    .replace(/^"|"$/g, "") || "quiropractica";

const content = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "content", "site-content.json"), "utf8")
);
delete content.vision;

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
await client.connect();
await client
  .db(dbName)
  .collection("site")
  .updateOne({ _id: "content" }, { $set: { ...content, _id: "content" } }, { upsert: true });
await client.close();
console.log("Subido a Mongo:", dbName, "site/content");
