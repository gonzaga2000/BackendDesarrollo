import request from 'supertest';
import app from '../../../../src/app';

describe('GET /meetings/admin', () => {
    it('should return all meetings for admin', async () => {
      const response = await request(app).get('/meetings/admin');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  