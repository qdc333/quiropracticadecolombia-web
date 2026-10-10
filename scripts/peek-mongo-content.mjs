import { MongoClient } from "mongodb";
import fs from "fs";

const raw = fs.readFileSync(".env.local", "utf8");
const uri = raw.split("\n").find((l) => l.startsWith("MONGODB_URI="))?.slice(12).replace(/^"|"$/g, "");
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
await client.connect();
const doc = await client.db("quiropractica").collection("site").findOne({ _id: "content" });
console.log("version:", doc?.version);
console.log("updatedAt:", doc?.updatedAt);
console.log("vision title:", doc?.visionMision?.vision?.title);
console.log("mision title:", doc?.visionMision?.mision?.title);
await client.close();
