import express from 'express';
const router = express.Router();
import usersCollection from '../../users/mongodb/usersCollection.js';
import createJwt from '../../createJwt.js';
import validatePayload from '../../middleware/validatePayload.js';
import Joi from 'joi';
import bcrypt from 'bcrypt';

const schema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

async function handleLogin(req, res) {
  const { email, password } = req.body;
  const user = await usersCollection.getUserByEmail(email);
  if(!user) {
    return res
      .status(403)
      .json({ statusCode: 403, error: 'Forbidden', message: 'USER_NOT_FOUND' });
  }
  const match = await bcrypt.compare(password, user.password);
  if(!match) {
    return res
      .status(403)
      .json({ statusCode: 403, error: 'Forbidden', message: 'USER_NOT_FOUND' });
  }
  const token = await createJwt({ userId: user.id });
  return res
    .status(200)
    .cookie('token', token, { withCredentials: true, httpOnly: false })
    .json(user.toApiResponse());
}

router.post('/api/auth/login', validatePayload(schema), handleLogin);
export default router;