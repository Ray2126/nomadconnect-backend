import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../../app';

describe('Signup endpoint', () => {
  it('should return successful response when given correct payload', async () => {
    const payload = {
      email: 'acbddd@gmail.com',
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
      email: 'acbddd@gmail.com',
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
      email: 'acbddd@gmail.com',
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

  it('should fail with joi error when password is missing from payload', async () => {
    const payload = {
      email: 'acbddd@gmail.com'
    };
    const res = await request(app)
      .post('/api/auth/signup')
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
      .post('/api/auth/signup')
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
      .post('/api/auth/signup')
      .send(payload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: '"email" must be a valid email'
    });
  });
});