import request from 'supertest';
import app from '../../../app';

let userId;
let jwt;
async function signUp() {
  const payload = {
    email: 'testing@gmail.com',
    password: '13768'
  };
  const res = await request(app)
    .post('/api/auth/signup')
    .send(payload)
    .set('Accept', 'application/json');
  userId = res.body.id;
  const cookies = res.headers['set-cookie'];
  const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
  jwt = tokenCookie.split('token=')[1].split(';')[0];
}

describe('Get User endpoint', () => {
  beforeAll(async () => {
    await signUp();
  });

  it('should return the user when given correct ID', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set('Cookie', [`token=${jwt}`])
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      id: userId,
      createdAt: expect.anything(),
      email: 'testing@gmail.com',
    });
  });

  it('should throw a 403 USER_NOT_FOUND error when given incorrect ID', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set('Cookie', [`token=${jwt}`])
      .send();

    expect(res.statusCode).toEqual(403);
    expect(res.body).toEqual({
      statusCode: 403,
      error: 'Forbidden',
      message: 'USER_NOT_FOUND'
    });
  });
});