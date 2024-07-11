import User from '../../auth/models/User.js';
import mongodb from '../../mongodb/index.js';
import { ObjectId } from 'mongodb';

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
  },

  async getUserById(id) {
    const result = await mongodb
      .db
      .collection('users')
      .findOne({ _id: ObjectId.createFromHexString(id) });
    return result ? User.fromMongoDocument(result) : undefined;
  },
};

export default usersCollection;