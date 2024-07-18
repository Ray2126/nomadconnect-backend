import express from 'express';
import createJourneyPoint from './createJourneyPoint.route.js';

const router = express.Router();

router.use(createJourneyPoint);

export default router;