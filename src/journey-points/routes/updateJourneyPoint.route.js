import express from 'express';
import Joi from 'joi';
import journeyPointsCollection from '../mongodb/journeyPointsCollection.js';
import validatePayload from '../../middleware/validatePayload.js';
const router = express.Router();

const schema = Joi.object({
  arrivalDate: Joi.string().optional(),
  departureDate: Joi.string().optional(),
}).min(1);

async function handleUpdateJourneyPoint(req, res) {
  const userId = req.userId;
  const journeyPointId = req.params.id;
  const journeyPoint = await journeyPointsCollection.getJourneyPointById(journeyPointId);
  if(journeyPoint.userId !== userId) {
    return res
      .status(403)
      .send();
  }
  journeyPoint.update(req.body);
  await journeyPointsCollection.updateJourneyPoint(journeyPoint);
  return res
    .status(200)
    .json(journeyPoint.toApiResponse());
}

router.put('/api/journey-points/:id', validatePayload(schema), handleUpdateJourneyPoint);
export default router;