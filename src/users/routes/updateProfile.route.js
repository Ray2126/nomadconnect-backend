import express from 'express';
const router = express.Router();
import validatePayload from '../../middleware/validatePayload.js';
import Joi from 'joi';
import usersCollection from '../mongodb/usersCollection.js';

const schema = Joi.object({
  name: Joi.string().optional(),
  bio: Joi.string().optional(),
  hometown: Joi.string().optional(),
  sex: Joi.string().valid('male', 'female').optional(),
  birthday: Joi.string().optional(),
  interests: Joi.array().optional(),
  occupation: Joi.string().optional(),
  socialLinks: Joi.array().optional(),
  //TODO profilePicture: Joi.string().optional(),
}).min(1);

async function handleUpdateProfile(req, res) {
  const userId = req.userId;
  const id = req.params.id;
  if(userId !== id) {
    return res
      .status(401)
      .json({ statusCode: 401, error: 'Unauthorized' });
  }
  const user = await usersCollection.getUserById(id);
  user.updateProfile(req.body);
  await usersCollection.updateUser(user);
  return res
    .status(200)
    .json(user.toApiResponse());
}

router.put('/api/users/:id/profile', validatePayload(schema), handleUpdateProfile);
export default router;