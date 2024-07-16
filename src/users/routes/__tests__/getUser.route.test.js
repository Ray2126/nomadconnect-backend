import request from 'supertest';
import app from '../../../app.js';
import mockSignUp from '../../../utilities/mockSignUp.js';

describe('Get User endpoint', () => {
  it('should return the user when given correct ID', async () => {
    const { userId, jwt } = await mockSignUp();
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
    const { jwt } = await mockSignUp();
    const res = await request(app)
      .get('/api/users/60d5f8f7e3b3c23d74f58069')
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