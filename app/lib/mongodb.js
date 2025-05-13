import { MongoClient } from "mongodb";

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to persist the connection across hot reloads.
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's better to not use a global variable and just connect directly.
  clientPromise = MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

// This clientPromise will be resolved when the client is ready to interact with the MongoDB server.
export const connectToDatabase = async () => {
  const client = await clientPromise
  return client.db() // returns the default database from the connection
}