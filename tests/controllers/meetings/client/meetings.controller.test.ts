import request from 'supertest';
import app from '../../../../src/app';


describe('GET /meetings/client', () => {
  let userId: string;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({ email: 'testClient@example.com', id: '123', firstName: 'Test Client', role: 'CLIENT' });

    expect(loginResponse.statusCode).toBe(200);

    userId = loginResponse.body.id;
  });



  it('should return meetings for a specific client', async () => {
    const response = await request(app)
      .get('/client/meetings')
      .set('userId', userId);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
  