import { MongoClient } from "mongodb";
import url from "url";

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(uri).pathname.substr(1);

  const db = client.db(dbName);

  cachedDb = db;

  return db;
}

export default async (request, response) => {
  const { email } = request.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection("subscribers");

  const verifyUnique = await collection.find({ email: email }).toArray();

  if (verifyUnique.length > 0) {
    return response.status(400).json({ ok: false });
  }

  await collection.insertOne({
    email,
    subscribedAt: new Date(),
  });

  return response.status(201).json({ ok: true });
};
