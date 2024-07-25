import request from 'supertest';
import app from '../../../app.js';
import mockSignUp from '../../../utilities/mockSignUp.js';

describe('Create Journey Point endpoint', () => {
  it('should delete the journey point', async () => {
    const { jwt } = await mockSignUp();
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
      .delete(`/api/journey-points/${journeyPointId}`)
      .set('Cookie', [`token=${jwt}`])
      .send();

    expect(res.statusCode).toEqual(204);
  });

  it('should throw error when deleting a journey point that the caller does not own', async () => {
    const signUp1 = await mockSignUp();
    const signUp2 = await mockSignUp({ email: 'abcd@gmail.com' });
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
      .delete(`/api/journey-points/${journeyPointId}`)
      .set('Cookie', [`token=${signUp2.jwt}`])
      .send();

    expect(res.statusCode).toEqual(403);
  });
});