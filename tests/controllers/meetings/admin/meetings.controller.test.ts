import request from 'supertest';
import app from '../../../../src/app';


describe('GET /meetings/admin', () => {
  let userId: string;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@example.com', id: '123', firstName: 'ADMIN', role: 'ADMIN' });

    expect(loginResponse.statusCode).toBe(200);

    userId = loginResponse.body.id;
  });


    it('should return all meetings for admin', async () => {
      const response = await request(app).get('/admin/meetings');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  