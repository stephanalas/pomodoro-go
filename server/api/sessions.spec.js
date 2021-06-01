const { expect } = require('chai');
const request = require('supertest');
const seed = require('../../script/seed');
const app = require('../app');

describe('Session routes', () => {
  beforeEach(async () => {
    await seed();
  });

  describe('/api/sessions/', () => {
    it('GET /api/sessions', async () => {
      const res = await request(app).get('/api/sessions').expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(192);
    });

    it('Include user model', async () => {
      const res = await request(app).get('/api/sessions').expect(200);

      expect(res.body[0]).to.have.property('user');
    });
  });
});
