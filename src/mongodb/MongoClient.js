import mongodb from 'mongodb';

class MongoClient {
  constructor(props = {}) {
    this.db = props.db;
    this.client = props.client;
  }

  async init() {
    this.client = new mongodb.MongoClient(process.env.MONGO_URI, {
      serverApi: {
        version: mongodb.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await this.client.connect();
    this.db = this.client.db('nomadconnect-prod');
  }

  async close() {
    await this.client?.close();
  }
}

export default MongoClient;