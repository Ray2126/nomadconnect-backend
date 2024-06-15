import 'dotenv/config';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../../app';

describe('Signup endpoint', () => {
  it('should return successful response when given correct payload', async () => {
    const payload = {
      email: 'acbddd.co.nz',
      password: '13768'
    };
    const res = await request(app)
      .post('/api/auth/signup')
      .send(payload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      email: payload.email,
      id: expect.anything(),
      createdAt: expect.anything(),
    });
  });

  it('should return JWT token in cookies when given correct payload', async () => {
    const payload = {
      email: 'acbddd.co.nz',
      password: '13768'
    };
    const res = await request(app)
      .post('/api/auth/signup')
      .send(payload)
      .set('Accept', 'application/json');
    const cookies = res.headers['set-cookie'];
    const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
    const jwtToken = tokenCookie.split('token=')[1].split(';')[0];
    const userId = res.body.id;

    expect(jwtToken).toBeDefined();
    expect(jwt.verify(jwtToken, process.env.JWT_SIGNING_KEY)).toEqual({
      iat: expect.anything(),
      userId,
    });
  });

  it('should return USER_EMAIL_ALREADY_EXISTS when a user with the given email already exists', async () => {
    const payload = {
      email: 'acbddd.co.nz',
      password: '13768'
    };
    const firstRes = await request(app)
      .post('/api/auth/signup')
      .send(payload)
      .set('Accept', 'application/json');

    const secondRes = await request(app)
      .post('/api/auth/signup')
      .send(payload)
      .set('Accept', 'application/json');

    expect(firstRes.statusCode).toEqual(200);
    expect(secondRes.statusCode).toEqual(403);
    expect(secondRes.body).toEqual({
      error: 'Forbidden',
      message: 'USER_EMAIL_ALREADY_EXISTS',
      statusCode: 403,
    });
  });
});