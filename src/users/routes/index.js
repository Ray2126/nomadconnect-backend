import express from 'express';
import getUser from './getUser.route.js';

const router = express.Router();

router.use(getUser);

export default router;