import "server-only";
import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Cache the connection on globalThis so dev hot-reloads and serverless
// invocations reuse a single connection instead of opening a new one each time.
const globalCache = globalThis as typeof globalThis & { _mongoose?: MongooseCache };
const cache: MongooseCache = (globalCache._mongoose ??= { conn: null, promise: null });

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set. Add it to .env.local.");

  if (cache.conn) return cache.conn;
  cache.promise ??= mongoose.connect(uri, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 8000,
  });
  try {
    cache.conn = await cache.promise;
  } catch (err) {
    cache.promise = null; // allow retry on next request
    throw err;
  }
  return cache.conn;
}
