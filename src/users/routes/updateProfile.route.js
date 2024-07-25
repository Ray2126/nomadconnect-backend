import express from 'express';
const router = express.Router();
import validatePayload from '../../middleware/validatePayload.js';
import Joi from 'joi';
import usersCollection from '../mongodb/usersCollection.js';

const TWO_MEGA_BYTES = 2 * 1024 * 1024;
const PROFILE_PICTURE_SIZE_LIMIT = Math.ceil(TWO_MEGA_BYTES * 1.33); // Approximate calculation for base64 encoding

const schema = Joi.object({
  name: Joi.string().optional(),
  bio: Joi.string().optional(),
  hometown: Joi.string().optional(),
  sex: Joi.string().valid('male', 'female').optional(),
  birthday: Joi.string().optional(),
  interests: Joi.array().optional(),
  occupation: Joi.string().optional(),
  socialLinks: Joi.array().optional(),
  profilePicture: Joi
    .string()
    .pattern(/^data:image\/(jpeg|jpg|png|gif|bmp|webp|svg);base64,[A-Za-z0-9+/=]+$/)
    .max(PROFILE_PICTURE_SIZE_LIMIT)
    .optional(),
}).min(1);

async function handleUpdateProfile(req, res) {
  const userId = req.userId;
  const user = await usersCollection.getUserById(userId);
  user.updateProfile(req.body);
  await usersCollection.updateUser(user);
  return res
    .status(200)
    .json(user.toApiResponse());
}

router.put('/api/profile', validatePayload(schema), handleUpdateProfile);
export default router;