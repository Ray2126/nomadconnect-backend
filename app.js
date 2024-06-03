import 'dotenv/config';
import express from 'express';
import mongodb from './mongodb.js';
const app = express();
const port = process.env.PORT || 3001

app.get('/', async (req, res) => {
  const data = await mongodb.db('sample_airbnb').collection('listingsAndReviews').findOne({ _id: '10006546' });
  res.send(JSON.stringify(data));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});