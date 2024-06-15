import 'dotenv/config';
import mongodb from './src/mongodb/index.js';

beforeAll(async () => {
  await mongodb.init();
});

afterEach(async () => {
  await mongodb.cleanUp();
});

afterAll(async () => {
  await mongodb.close();
});