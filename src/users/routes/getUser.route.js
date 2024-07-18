import express from 'express';
const router = express.Router();

import usersCollection from '../mongodb/usersCollection.js';

async function handleGetUser(req, res) {
  const id = req.userId;
  const user = await usersCollection.getUserById(id);
  if(!user) {
    return res
      .status(403)
      .json({ statusCode: 403, error: 'Forbidden', message: 'USER_NOT_FOUND' });
  }
  return res
    .status(200)
    .json(user.toApiResponse());
}

router.get('/api/users', handleGetUser);
export default router;