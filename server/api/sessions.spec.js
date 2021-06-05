/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const {
  db,
  models: { Session, User },
} = require('../db');
const seed = require('../../script/seed');
const app = require('../app');

describe('Session routes', () => {
  beforeEach(async () => {
    await seed();
  });

  describe('GET /api/sessions/', () => {
    it('returns all sessions', async () => {
      const res = await request(app).get('/api/sessions').expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(30);
    });

    it('Include user model', async () => {
      const res = await request(app).get('/api/sessions').expect(200);

      expect(res.body[0]).to.have.property('user');
    });
  }); 
  describe('POST /api/sessions/', () => {
    it('creates a new session', async () => {
      const user = await User.findOne({ where: { username: 'cody'}})
      const data = {
        userId: user.id
      }
      const res = await request(app).post('/api/sessions').send(data)
      expect(JSON.parse(res.text).userId).to.equal(user.id)
    })
  })
  // end describe('/api/sessions')
}); // end describe('Session routes')
