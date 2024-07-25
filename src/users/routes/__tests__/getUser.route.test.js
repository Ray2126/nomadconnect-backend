import request from 'supertest';
import app from '../../../app.js';
import mockSignUp from '../../../utilities/mockSignUp.js';

describe('Get User endpoint', () => {
  it('should return the user when given correct ID', async () => {
    const { userId } = await mockSignUp();
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      id: userId,
      createdAt: expect.anything(),
      email: 'testing@gmail.com',
    });
  });
});