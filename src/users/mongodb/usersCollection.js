import User from '../../auth/models/User.js';
import mongodb from '../../mongodb/index.js';

const usersCollection = {
  async createUser(user) {
    const result = await mongodb
      .db
      .collection('users')
      .insertOne(await user.toMongoDocument());
    user.id = result.insertedId;
  },

  async getUserByEmail(email) {
    const result = await mongodb
      .db
      .collection('users')
      .findOne({ email });
    return result ? User.fromMongoDocument(result) : undefined;
  }
};

export default usersCollection;