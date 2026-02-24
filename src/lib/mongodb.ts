import { MongoClient, Db } from 'mongodb';

const options = {};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please add MONGODB_URI to your environment variables');
  }

  if (process.env.NODE_ENV === 'development') {
    // Use a global variable to preserve the MongoClient across hot reloads in development
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  const client = new MongoClient(uri, options);
  return client.connect();
}

export default function clientPromise(): Promise<MongoClient> {
  return getClientPromise();
}

export async function getDatabase(): Promise<Db> {
  const client = await getClientPromise();
  return client.db('dhanyatraders');
}

// Collection names
export const COLLECTIONS = {
  INQUIRIES: 'inquiries',
  CONTACTS: 'contacts',
  ADMIN: 'admins',
} as const;
