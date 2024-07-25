import express from 'express';
import getUser from './getUser.route.js';
import updateProfile from './updateProfile.route.js';
import authorizeMiddleware from '../../middleware/authorize.js';

const router = express.Router();

router.use(getUser);
router.use(authorizeMiddleware, updateProfile);

export default router;