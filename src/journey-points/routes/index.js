import express from 'express';
import createJourneyPoint from './createJourneyPoint.route.js';
import listJourneyPoints from './listJourneyPoints.route.js';
import deleteJourneyPoint from './deleteJourneyPoint.route.js';

const router = express.Router();

router.use(createJourneyPoint);
router.use(listJourneyPoints);
router.use(deleteJourneyPoint);

export default router;