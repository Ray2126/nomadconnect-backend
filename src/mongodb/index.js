import MongoClient from './MongoClient.js';
import MongoMemoryServerClient from './MongoMemoryServerClient.js';

const env = process.env.ENV || 'local';

const mongoClient = env === 'local' ? new MongoMemoryServerClient() : new MongoClient();

export default mongoClient;