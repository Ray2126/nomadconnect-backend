import 'dotenv/config';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../../app';

describe('Login endpoint', () => {
  it('should return successful response when user exists and password matches', async () => {
    const payload = {
      email: 'acbddd@gmail.com',
      password: '13768'
    };
    await request(app)
      .post('/api/auth/signup')
      .send(payload)
      .set('Accept', 'application/json');

    const res = await request(app)
      .post('/api/auth/login')
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
      email: 'acbddd@gmail.com',
      password: '13768'
    };
    await request(app)
      .post('/api/auth/signup')
      .send(payload)
      .set('Accept', 'application/json');

    const res = await request(app)
      .post('/api/auth/login')
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

  it('should return 403 USER_NOT_FOUND when user exists but password does not match', async () => {
    const payload = {
      email: 'acbddd@gmail.com',
      password: '13768'
    };
    await request(app)
      .post('/api/auth/signup')
      .send(payload)
      .set('Accept', 'application/json');

    const res = await request(app)
      .post('/api/auth/login')
      .send({ ...payload, password: 'abcd' })
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(403);
    expect(res.body).toEqual({
      statusCode: 403,
      error: 'Forbidden',
      message: 'USER_NOT_FOUND',
    });
  });

  it('should return 403 USER_NOT_FOUND when user does not exist', async () => {
    const payload = {
      email: 'acbddd@gmail.com',
      password: '13768'
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(payload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(403);
    expect(res.body).toEqual({
      statusCode: 403,
      error: 'Forbidden',
      message: 'USER_NOT_FOUND',
    });
  });

  it('should fail with joi error when password is missing from payload', async () => {
    const payload = {
      email: 'acbddd@gmail.com'
    };
    const res = await request(app)
      .post('/api/auth/login')
      .send(payload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: '"password" is required'
    });
  });

  it('should fail with joi error when email is missing from payload', async () => {
    const payload = {
      password: '1234'
    };
    const res = await request(app)
      .post('/api/auth/login')
      .send(payload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: '"email" is required'
    });
  });

  it('should fail with joi error when email is not a well-formed email', async () => {
    const payload = {
      email: 'abcd@co@nz',
      password: '1234'
    };
    const res = await request(app)
      .post('/api/auth/login')
      .send(payload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: '"email" must be a valid email'
    });
  });
});