import mongodb from '../../mongodb/index.js';

const journeyPointsCollection = {
  async createJourneyPoint(journeyPoint) {
    const result = await mongodb
      .db
      .collection('journey-points')
      .insertOne(journeyPoint.toMongoDocument());
    journeyPoint.id = result.insertedId;
  },
};

export default journeyPointsCollection;