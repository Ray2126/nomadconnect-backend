import jwt from 'jsonwebtoken';

async function createJwt(payload) {
  return await jwt.sign(payload, process.env.JWT_SIGNING_KEY);
}

export default createJwt;