import express from 'express';
import getUser from './getUser.route.js';
import updateProfile from './updateProfile.route.js';

const router = express.Router();

router.use(getUser);
router.use(updateProfile);

export default router;