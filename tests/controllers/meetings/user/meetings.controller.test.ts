import request from 'supertest';
import app from '../../../../src/app';

describe('User Meetings Controller', () => {  
  describe('POST /meetings/user', () => {
    it('should create a new meeting and return 200 status code', async () => {
      const response = await request(app)
        .post('/meetings/user')
        .send({ description: 'Test Meeting', fecha: '2023-01-01', clientMail: 'client@example.com' });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('GET /meetings/user', () => {
    it('should return 200 status code', async () => {
      const response = await request(app).get('/meetings/user');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('GET /meetings/user/:id', () => {
    it('should return 200 status code', async () => {
      const response = await request(app).get('/meetings/user/1');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('PUT /meetings/user/:id', () => {
    it('should update a meeting and return 200 status code', async () => {
      const meetingId = 1; // Asegúrate de que este ID exista en tu base de datos de pruebas
      const updatedData = {
        description: 'Updated Meeting Description',
        fechaReunion: '2023-12-10'
      };

      const response = await request(app)
        .put(`/meetings/user/${meetingId}`)
        .send(updatedData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'meeting actualizada correctamente');
    });
  });


});