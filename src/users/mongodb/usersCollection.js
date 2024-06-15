import mongodb from '../../mongodb.js';
const collection = mongodb.collection('users');

// await mongodb.db('sample_airbnb').collection('listingsAndReviews').createIndex({ 'apple': 1 }, { unique: true, sparse: true, name: 'my-new-index' });

const usersCollection = {
  async createUser(user) {
    const result = await collection.insertOne(await user.toMongoDocument());
    user._id = result.insertedId;
  }
};

export default usersCollection;