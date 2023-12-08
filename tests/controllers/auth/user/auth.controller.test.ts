import request from 'supertest';
import app from '../../../../src/app';
import { MockContext, Context, createMockContext } from '../../../controllers/context';


let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})


describe('POST /auth/login', () => {
  it('should create a new user and return 200 status code', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', id: '123', firstName: 'Test User', role: 'CLIENT' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
});
