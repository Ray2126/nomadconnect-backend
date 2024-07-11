import express from 'express';
import login from './login.route.js';
import signup from './signup.route.js';

const router = express.Router();

router.use(login);
router.use(signup);

export default router;