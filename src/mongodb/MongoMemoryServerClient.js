import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, ServerApiVersion } from 'mongodb';

async function setUpCollections(db) {
  await db.createCollection('users');
  await db.createCollection('journey-points');
  await db.collection('users').createIndex({ email: 1 }, { unique: true, name: 'email-index' });
}

class MongoMemoryServerClient {
  constructor(props = {}) {
    this.db = props.db;
    this.client = props.client;
    this.server = props.server;
  }

  async init() {
    if(!this.server) {
      this.server = await MongoMemoryServer.create();
    }
    if(!this.client) {
      this.client = new MongoClient(this.server.getUri(), {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    }
    await this.client.connect();
    this.db = this.client.db('nomadconnect-local');
    await setUpCollections(this.db);
  }

  async cleanUp() {
    const collections = await this.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }

  async close() {
    await this.client?.close();
    await this.server?.stop();
  }
}

export default MongoMemoryServerClient;