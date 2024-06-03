require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const mongodb = require('./mongodb');

app.get('/', async (req, res) => {
  const data = await mongodb.db("sample_airbnb").collection('listingsAndReviews').findOne({ _id: '10006546' });
  res.send(JSON.stringify(data));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})