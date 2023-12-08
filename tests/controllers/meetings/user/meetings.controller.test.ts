import request from 'supertest';
import app from '../../../../src/app';


describe('GET /meetings/user', () => {
  let userId: string;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({ email: 'testUser@example.com', id: '123', firstName: 'Test User', role: 'WORKER' });

    expect(loginResponse.statusCode).toBe(200);

    userId = loginResponse.body.id;
  });

    it('should create a new meeting and return 200 status code', async () => {
      const response = await request(app)
      .get('/meetings')
      .set('userId', userId);
      expect(response.statusCode).toBe(200);
      // expect(response.body).toHaveProperty('meetings');
    });
  });
