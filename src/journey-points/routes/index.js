import express from 'express';
import createJourneyPoint from './createJourneyPoint.route.js';
import listJourneyPoints from './listJourneyPoints.route.js';

const router = express.Router();

router.use(createJourneyPoint);
router.use(listJourneyPoints);

export default router;