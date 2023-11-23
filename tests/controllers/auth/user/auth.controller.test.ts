import request from 'supertest';
import app from '../../../../src/app';

describe('POST /auth/login', () => {
  it('should create a new user and return 200 status code', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', id: '123', name: 'Test User', role: 'CLIENT' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
});
