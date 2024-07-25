import request from 'supertest';
import app from '../../../app.js';
import mockSignUp from '../../../utilities/mockSignUp.js';

describe('List Journey Points endpoint', () => {
  it('should list the journey point successfully', async () => {
    const { userId, jwt } = await mockSignUp();
    const payload = {
      city: 'Auckland',
      arrivalDate: '2024-01-01',
      departureDate: '2024-02-01',
      country: 'New Zealand',
    };
    await request(app)
      .post('/api/journey-points')
      .set('Cookie', [`token=${jwt}`])
      .send(payload)
      .set('Accept', 'application/json');

    const res = await request(app)
      .get('/api/journey-points')
      .set('Cookie', [`token=${jwt}`])
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      items: [
        {
          id: expect.anything(),
          createdAt: expect.anything(),
          userId,
          city: 'Auckland',
          arrivalDate: '2024-01-01',
          departureDate: '2024-02-01',
          country: 'New Zealand',
        }
      ],
    });
  });

  it('should return an empty list when the user has no journey points', async () => {
    const { jwt } = await mockSignUp();

    const res = await request(app)
      .get('/api/journey-points')
      .set('Cookie', [`token=${jwt}`])
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      items: [],
    });
  });
});