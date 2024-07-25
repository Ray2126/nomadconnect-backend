import express from 'express';
import journeyPointsCollection from '../mongodb/journeyPointsCollection.js';
const router = express.Router();

async function handleDeleteJourneyPoint(req, res) {
  const userId = req.userId;
  const journeyPointId = req.params.id;
  const journeyPoint = await journeyPointsCollection.getJourneyPointById(journeyPointId);
  if(journeyPoint.userId !== userId) {
    return res
      .status(403)
      .send();
  }
  await journeyPointsCollection.deleteJourneyPoint(journeyPoint.id);
  return res
    .status(204)
    .send();
}

router.delete('/api/journey-points/:id', handleDeleteJourneyPoint);
export default router;