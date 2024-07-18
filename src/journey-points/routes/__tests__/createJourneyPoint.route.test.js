import request from 'supertest';
import app from '../../../app.js';
import mockSignUp from '../../../utilities/mockSignUp.js';

describe('Create Journey Point endpoint', () => {
  it('should create the journey point successfully when given correct payload', async () => {
    const { userId, jwt } = await mockSignUp();
    const payload = {
      city: 'Auckland',
      arrivalDate: '2024-01-01',
      departureDate: '2024-02-01',
      country: 'New Zealand',
    };
    const res = await request(app)
      .post('/api/journey-points')
      .set('Cookie', [`token=${jwt}`])
      .send(payload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      id: expect.anything(),
      createdAt: expect.anything(),
      userId,
      city: 'Auckland',
      arrivalDate: '2024-01-01',
      departureDate: '2024-02-01',
      country: 'New Zealand',
    });
  });

  it('should fail with 400 when payload is missing country', async () => {
    const { jwt } = await mockSignUp();
    const payload = {
      arrivalDate: '2024-01-01',
      departureDate: '2024-02-01',
      city: 'Auckland',
    };
    const res = await request(app)
      .post('/api/journey-points')
      .set('Cookie', [`token=${jwt}`])
      .send(payload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(400);
  });

  it('should fail with 400 when payload is missing arrivalDate', async () => {
    const { jwt } = await mockSignUp();
    const payload = {
      city: 'Auckland',
      departureDate: '2024-02-01',
      country: 'New Zealand',
    };
    const res = await request(app)
      .post('/api/journey-points')
      .set('Cookie', [`token=${jwt}`])
      .send(payload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(400);
  });
});