const { expect } = require('chai');
const request = require('supertest');
const seed = require('../../script/seed');
const app = require('../app');

describe('Goal routes', () => {
  beforeEach(async () => {
    await seed();
  });

  describe('/api/goals/', () => {
    it('GET /api/goals', async () => {
      const res = await request(app).get('/api/goals').expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(4);
    });

    it('Include task model', async () => {
      const res = await request(app).get('/api/goals').expect(200);
      expect(res.body[0]).to.have.property('tasks');
    });
  });
});
