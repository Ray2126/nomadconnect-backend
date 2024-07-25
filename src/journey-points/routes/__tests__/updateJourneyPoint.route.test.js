import request from 'supertest';
import app from '../../../app.js';
import mockSignUp from '../../../utilities/mockSignUp.js';

describe('Update Journey Point endpoint', () => {
  it('should update the journey point successfully when given correct payload', async () => {
    const { userId, jwt } = await mockSignUp();
    const payload = {
      city: 'Auckland',
      arrivalDate: '2024-01-01',
      departureDate: '2024-02-01',
      country: 'New Zealand',
    };
    const createResponse = await request(app)
      .post('/api/journey-points')
      .set('Cookie', [`token=${jwt}`])
      .send(payload)
      .set('Accept', 'application/json');
    const journeyPointId = createResponse.body.id;

    const res = await request(app)
      .put(`/api/journey-points/${journeyPointId}`)
      .set('Cookie', [`token=${jwt}`])
      .send({
        arrivalDate: '2024-02-01',
        departureDate: '2024-03-01',
      })
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      id: journeyPointId,
      createdAt: expect.anything(),
      userId,
      city: 'Auckland',
      arrivalDate: '2024-02-01',
      departureDate: '2024-03-01',
      country: 'New Zealand',
    });
  });

  it('should throw error when updating a journey point that the caller does not own', async () => {
    const signUp1 = await mockSignUp();
    const signUp2 = await mockSignUp({ email: 'abcde@gmail.com' });
    const payload = {
      city: 'Auckland',
      arrivalDate: '2024-01-01',
      departureDate: '2024-02-01',
      country: 'New Zealand',
    };
    const createResponse = await request(app)
      .post('/api/journey-points')
      .set('Cookie', [`token=${signUp1.jwt}`])
      .send(payload)
      .set('Accept', 'application/json');
    const journeyPointId = createResponse.body.id;

    const res = await request(app)
      .put(`/api/journey-points/${journeyPointId}`)
      .set('Cookie', [`token=${signUp2.jwt}`])
      .send({
        departureDate: '2024-03-01',
      })
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(403);
  });
});