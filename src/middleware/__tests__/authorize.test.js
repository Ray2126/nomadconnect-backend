import request from 'supertest';
import express from 'express';
import authorizeMiddleware from '../authorize.js';
import createJwt from '../../createJwt';
import cookieParser from 'cookie-parser';
const app = express();
let token;

describe('Authorize Middleware', () => {
  beforeAll(async () => {
    app.use(cookieParser());
    app.get('/test', authorizeMiddleware, (req, res) => res.send(200));
    token = await createJwt({ userId: '1234' });
  });

  it('should return 200 when given correct JWT in the cookies', async () => {
    const res = await request(app)
      .get('/test')
      .set('Cookie', [`token=${token}`])
      .send();

    expect(res.statusCode).toEqual(200);
  });

  it('should return 401 when not given a JWT', async () => {
    const res = await request(app)
      .get('/test')
      .send();

    expect(res.statusCode).toEqual(401);
  });

  it('should return 401 when given incorrect JWT', async () => {
    const res = await request(app)
      .get('/test')
      .set('Cookie', ['token=1234'])
      .send();

    expect(res.statusCode).toEqual(401);
  });
});