import mongoose from "mongoose";

const globalForMongoose = globalThis as unknown as {
  mongooseConn?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
    uri?: string;
  };
};

const cached = globalForMongoose.mongooseConn ?? {
  conn: null,
  promise: null,
  uri: undefined,
};
globalForMongoose.mongooseConn = cached;

/** Always use the existing Atlas DB name casing: Portfolio */
export const MONGO_DB_NAME = "Portfolio";

function normalizeMongoUri(uri: string) {
  const trimmed = uri.trim();
  // Replace /portfolio (any case) with /Portfolio before query string
  return trimmed.replace(/\/portfolio(?=\?|$)/i, `/${MONGO_DB_NAME}`);
}

export async function connectDB() {
  const rawUri = process.env.MONGODB_URI?.trim();
  if (!rawUri) {
    throw new Error("MONGODB_URI is not set");
  }

  const uri = normalizeMongoUri(rawUri);

  // If URI changed (e.g. after env fix), drop stale connection cache
  if (cached.uri && cached.uri !== uri) {
    cached.conn = null;
    cached.promise = null;
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect().catch(() => undefined);
    }
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.uri = uri;
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
        dbName: MONGO_DB_NAME,
      })
      .catch((error) => {
        cached.promise = null;
        cached.conn = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export function hasMongoUri() {
  return Boolean(process.env.MONGODB_URI?.trim());
}
