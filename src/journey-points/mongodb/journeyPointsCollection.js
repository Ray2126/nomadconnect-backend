import mongodb from '../../mongodb/index.js';
import JourneyPoint from '../models/JourneyPoint.js';

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
};

export default journeyPointsCollection;