import express from 'express';
import Joi from 'joi';
import JourneyPoint from '../models/JourneyPoint.js';
import journeyPointsCollection from '../mongodb/journeyPointsCollection.js';
import validatePayload from '../../middleware/validatePayload.js';
import authorizeMiddleware from '../../middleware/authorize.js';
const router = express.Router();

const schema = Joi.object({
  country: Joi.string().required(),
  arrivalDate: Joi.string().required(),
  city: Joi.string().optional(),
  departureDate: Joi.string().optional(),
});

async function handleCreateJourneyPoint(req, res) {
  const userId = req.userId;
  const { city, arrivalDate, departureDate, country } = req.body;
  const journeyPoint = new JourneyPoint({
    userId,
    city,
    arrivalDate,
    departureDate,
    country,
  });
  await journeyPointsCollection.createJourneyPoint(journeyPoint);
  return res
    .status(200)
    .json(journeyPoint.toApiResponse());
}

router.post('/api/journey-points', authorizeMiddleware, validatePayload(schema), handleCreateJourneyPoint);
export default router;