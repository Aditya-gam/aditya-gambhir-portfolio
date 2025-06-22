import { MongoClient, MongoClientOptions } from 'mongodb';

declare global {
  // Allow global _mongoClientPromise in development
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

const uri = process.env.MONGODB_URI;

// MongoDB connection options following latest best practices
const options: MongoClientOptions = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

/**
 * MongoDB client connection for Next.js applications.
 * In development, the connection is cached globally to prevent
 * multiple connections during hot reloads.
 */
const mongoClientPromise: Promise<MongoClient> =
  process.env.NODE_ENV === 'development'
    ? (() => {
        // In development mode, use a global variable to preserve the connection
        // across module reloads caused by HMR (Hot Module Replacement)
        if (global._mongoClientPromise === undefined) {
          const mongoClient = new MongoClient(uri, options);
          global._mongoClientPromise = mongoClient.connect();
        }
        return global._mongoClientPromise;
      })()
    : (() => {
        // In production mode, create a new client for each connection
        const mongoClient = new MongoClient(uri, options);
        return mongoClient.connect();
      })();

export default mongoClientPromise;
