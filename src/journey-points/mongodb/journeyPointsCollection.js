import mongodb from '../../mongodb/index.js';
import JourneyPoint from '../models/JourneyPoint.js';
import { ObjectId } from 'mongodb';

const journeyPointsCollection = {
  async createJourneyPoint(journeyPoint) {
    const result = await mongodb
      .db
      .collection('journey-points')
      .insertOne(journeyPoint.toMongoDocument());
    journeyPoint.id = result.insertedId;
  },

  async listJourneyPointsForUser(userId) {
    const result = await mongodb
      .db
      .collection('journey-points')
      .find({ userId })
      .toArray();
    return result.map(r => JourneyPoint.fromMongoDocument(r));
  },

  async getJourneyPointById(id) {
    const result = await mongodb
      .db
      .collection('journey-points')
      .findOne({ _id: ObjectId.createFromHexString(id) });
    return result ? JourneyPoint.fromMongoDocument(result) : undefined;
  },

  async deleteJourneyPoint(id) {
    await mongodb
      .db
      .collection('journey-points')
      .deleteOne({ _id: id });
  },

  async updateJourneyPoint(journeyPoint) {
    await mongodb
      .db
      .collection('journey-points')
      .updateOne({ _id: journeyPoint.id }, { $set: journeyPoint.toMongoUpdateDocument() });
  },
};

export default journeyPointsCollection;