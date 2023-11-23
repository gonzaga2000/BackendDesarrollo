import request from 'supertest';
import app from '../../../../src/app';

describe('POST /meetings/user', () => {
    it('should create a new meeting and return 200 status code', async () => {
      const response = await request(app)
        .post('/meetings/user')
        .send({ description: 'Test Meeting', fecha: '2023-01-01', clientMail: 'client@example.com' });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
  });
