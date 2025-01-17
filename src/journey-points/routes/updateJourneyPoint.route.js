import express from 'express';
import Joi from 'joi';
import journeyPointsCollection from '../mongodb/journeyPointsCollection.js';
import validatePayload from '../../middleware/validatePayload.js';
import authorizeMiddleware from '../../middleware/authorize.js';
const router = express.Router();

const schema = Joi.object({
  arrivalDate: Joi.string().required(),
  departureDate: Joi.string().optional(),
});

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

router.put('/api/journey-points/:id', authorizeMiddleware, validatePayload(schema), handleUpdateJourneyPoint);
export default router;