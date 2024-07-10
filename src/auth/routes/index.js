import express from 'express';
import login from './login.route';
import signup from './signup.route';

const router = express.Router();

router.use(login);
router.use(signup);

export default router;