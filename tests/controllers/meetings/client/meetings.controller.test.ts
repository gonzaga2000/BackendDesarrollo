import request from 'supertest';
import app from '../../../../src/app';

describe('GET /meetings/client', () => {
    it('should return meetings for a specific client', async () => {
      const response = await request(app).get('/meetings/client').send({ clientId: 'client-id' });
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  