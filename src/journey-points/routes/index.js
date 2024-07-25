import express from 'express';
import createJourneyPoint from './createJourneyPoint.route.js';
import listJourneyPoints from './listJourneyPoints.route.js';
import deleteJourneyPoint from './deleteJourneyPoint.route.js';
import updateJourneyPoint from './updateJourneyPoint.route.js';

const router = express.Router();

router.use(createJourneyPoint);
router.use(listJourneyPoints);
router.use(deleteJourneyPoint);
router.use(updateJourneyPoint);

export default router;