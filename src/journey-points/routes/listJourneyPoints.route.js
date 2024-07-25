import express from 'express';
import journeyPointsCollection from '../mongodb/journeyPointsCollection.js';
const router = express.Router();

async function handleListJourneyPoints(req, res) {
  const userId = req.userId;
  const journeyPoints = await journeyPointsCollection.listJourneyPointsForUser(userId);
  return res
    .status(200)
    .json({
      items: journeyPoints.map(j => j.toApiResponse()),
    });
}

router.get('/api/journey-points', handleListJourneyPoints);
export default router;