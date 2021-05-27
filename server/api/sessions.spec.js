/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { Session, User } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')

describe('Session routes', () => {
  beforeEach(async() => {
    await seed();
  })

  describe('/api/sessions/', () => {

    it('GET /api/sessions', async () => {
      const res = await request(app)
        .get('/api/sessions')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(23);
    })

    it('Include user model', async () => {
      const res = await request(app)
        .get('/api/sessions')
        .expect(200)

      expect(res.body[0]).to.have.property('user');
    })

  }) // end describe('/api/sessions')
}) // end describe('Session routes')
