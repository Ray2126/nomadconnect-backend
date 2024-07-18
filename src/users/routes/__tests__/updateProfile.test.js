import request from 'supertest';
import app from '../../../app.js';
import mockSignUp from '../../../utilities/mockSignUp.js';

describe('Update Profile endpoint', () => {
  it('should update the profile of the user when given correct payload', async () => {
    const { userId, jwt } = await mockSignUp();
    const payload = {
      name: 'Raymond',
      bio: 'My name is Raymond and I am a Software Engineer',
      hometown: 'Auckland, New Zealand',
      sex: 'male',
      birthday: '2024-10-01',
      interests: ['gaming', 'programming', 'gym', 'sports'],
      occupation: 'Software Engineer',
      socialLinks: [
        { type: 'linkedin', 'url': 'https://www.linkedin.com/in/raymond-yang-96365419a/' },
      ]
    };
    const res = await request(app)
      .put(`/api/users/${userId}/profile`)
      .set('Cookie', [`token=${jwt}`])
      .send(payload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      id: userId,
      createdAt: expect.anything(),
      email: 'testing@gmail.com',
      name: 'Raymond',
      bio: 'My name is Raymond and I am a Software Engineer',
      hometown: 'Auckland, New Zealand',
      sex: 'male',
      birthday: '2024-10-01',
      interests: ['gaming', 'programming', 'gym', 'sports'],
      occupation: 'Software Engineer',
      socialLinks: [
        { type: 'linkedin', 'url': 'https://www.linkedin.com/in/raymond-yang-96365419a/' },
      ]
    });
  });

  it('should throw 401 error when attempting to update a different user', async () => {
    const { jwt } = await mockSignUp();
    const payload = {
      name: 'Raymond',
    };
    const res = await request(app)
      .put('/api/users/60d5f8f7e3b3c23d74f58069/profile')
      .set('Cookie', [`token=${jwt}`])
      .send(payload)
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      statusCode: 401,
      error: 'Unauthorized'
    });
  });

  describe('payload validation', () => {
    const invalidScenarios = [
      {
        name: 'no fields supplied',
        payload: {},
      },
      {
        name: 'sex is not valid',
        payload: {
          sex: 'penguin',
        }
      },
      {
        name: 'interests is not an array',
        payload: {
          interest: 'sports',
        }
      },
      {
        name: 'social links is not an array',
        payload: {
          socialLinks: 'facebook',
        }
      },
    ];

    invalidScenarios.forEach(scenario => {
      it(`should fail when ${scenario.name}`, async () => {
        const { userId, jwt } = await mockSignUp();
        const res = await request(app)
          .put(`/api/users/${userId}/profile`)
          .set('Cookie', [`token=${jwt}`])
          .send(scenario.payload)
          .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(400);
      });
    });
  });
});