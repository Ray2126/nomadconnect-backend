import request from 'supertest';
import app from '../app.js';

async function mockSignUp() {
  const payload = {
    email: 'testing@gmail.com',
    password: '13768'
  };
  const res = await request(app)
    .post('/api/auth/signup')
    .send(payload)
    .set('Accept', 'application/json');
  const userId = res.body.id;
  const cookies = res.headers['set-cookie'];
  const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
  const jwt = tokenCookie.split('token=')[1].split(';')[0];

  return { userId, jwt };
}

export default mockSignUp;
