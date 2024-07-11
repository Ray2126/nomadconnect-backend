import jwt from 'jsonwebtoken';

export default function authorize(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res
      .status(401)
      .json({ statusCode: 401, error: 'Unauthorized' });
  }
  jwt.verify(token, process.env.JWT_SIGNING_KEY, async (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ statusCode: 401, error: 'Unauthorized' });
    } else {
      req.userId = decoded.userId;
      next();
    }
  });
};