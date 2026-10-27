import "dotenv/config";
import { MongoClient, ServerApiVersion, Db } from "mongodb";

const uri = process.env.MONGO_URI || "";
// console.log(uri);
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let _db: MongoClient | null = null;

const connectDb = async (callback:Function) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    
    _db = client;
    console.log("Connected to MongoDB!");
    callback(null, _db);
  } catch (err) {
    callback(err);
  }
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db.db(process.env.MONGO_DATABASE);
};

const closeDb = async () => {
  if (_db) {
    try {
      await _db.close();
    } finally {
      _db = null;
    }
  }
};

export default {
  connectDb,
  getDb,
  closeDb,
};