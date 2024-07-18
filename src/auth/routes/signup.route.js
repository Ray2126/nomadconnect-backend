import express from 'express';
const router = express.Router();
import User from '../../users/models/User.js';
import usersCollection from '../../users/mongodb/usersCollection.js';
import createJwt from '../../createJwt.js';
import validatePayload from '../../middleware/validatePayload.js';
import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

// eslint-disable-next-line complexity
async function handleSignUp(req, res) {
  const { email, password } = req.body;
  const user = new User({
    email,
    password,
  });
  try {
    await usersCollection.createUser(user);
  } catch (err) {
    const isDuplicateEmailError = err.errorResponse?.code === 11000 && err.errorResponse?.keyPattern?.email === 1;
    if(isDuplicateEmailError) {
      return res
        .status(403)
        .json({ statusCode: 403, error: 'Forbidden', message: 'USER_EMAIL_ALREADY_EXISTS' });
    }
    throw err;
  }
  const token = await createJwt({ userId: user.id });
  return res
    .status(200)
    .cookie('token', token, { secure: true, httpOnly: true })
    .json(user.toApiResponse());
}

router.post('/api/auth/signup', validatePayload(schema), handleSignUp);
export default router;