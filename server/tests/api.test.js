import request from 'supertest';
import app from '../src/server.js';
import { connect, closeDatabase, clearDatabase } from './setup.js';

beforeAll(async () => await connect(), 60000);
afterEach(async () => await clearDatabase(), 60000);
afterAll(async () => await closeDatabase(), 60000);

describe('API Tests', () => {
  let token;
  let userId;

  describe('Auth Tests', () => {
    it('should register a new user successfully (Auth Test 1)', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', 'test@example.com');
    });

    it('should fail login with incorrect password (Auth Test 2)', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({ name: 'Test User 2', email: 'test2@example.com', password: 'password123' });

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test2@example.com', password: 'wrongpassword' });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Invalid email or password');
    });
  });

  describe('Board Tests', () => {
    beforeEach(async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Board User', email: 'board@example.com', password: 'password123' });
      token = res.body.token;
      userId = res.body.user.id;
    });

    it('should successfully create a new board (Board Test 1)', async () => {
      const res = await request(app)
        .post('/api/boards')
        .set('Authorization', 'Bearer ' + token)
        .send({ name: 'New Project Board' });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('name', 'New Project Board');
      expect(res.body.ownerId.toString()).toEqual(userId.toString());
    });
  });
});
