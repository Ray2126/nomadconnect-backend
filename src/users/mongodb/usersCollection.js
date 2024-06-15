import mongodb from '../../mongodb/index.js';

const usersCollection = {
  async createUser(user) {
    const result = await mongodb
      .db
      .collection('users')
      .insertOne(await user.toMongoDocument());
    user._id = result.insertedId;
  }
};

export default usersCollection;