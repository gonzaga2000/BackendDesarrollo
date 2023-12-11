import request from 'supertest';
import app from '../../../../src/app';

describe('GET /meetings/client', () => {
    it('should return meetings for a specific client', async () => {
      const response = await request(app).get('/meetings/client').send({ clientId: 'client-id' });
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should handle non-existent clients', async () => {
      const response = await request(app).get('/meetings/client').send({ clientId: 'non-existent-client-id' });
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'No se encontró el cliente');
    });

    it('should handle missing client ID', async () => {
      const response = await request(app).get('/meetings/client');
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('message', 'El ID del cliente es requerido');
    });
    
  });
  