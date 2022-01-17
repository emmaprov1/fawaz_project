import { MongoClient } from 'mongodb';

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

const globalApp: any = global;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = globalApp.mongo;

if (!cached) {
  cached = globalApp.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // const opts = {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // };

    cached.promise = MongoClient.connect(MONGODB_URI).then(client => {
      return {
        client,
        db: client.db(MONGODB_DB)
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// import mongoose from 'mongoose';

// const connectDB = handler => async (req, res) => {
//   if (mongoose.connections[0].readyState) {
//     // Use current db connection
//     return handler(req, res);
//   }
//   // Use new db connection
//   await mongoose.connect(process.env.mongodburl);
//   return handler(req, res);
// };

// export default connectDB;
