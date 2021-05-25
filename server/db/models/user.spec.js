/* global describe beforeEach it */

const { expect } = require('chai');
const {
  db,
  models: { User },
} = require('../index');
const jwt = require('jsonwebtoken');
const seed = require('../../../script/seed');

describe('User model', () => {
  let users;
  beforeEach(async () => {
    users = (await seed()).users;
  });

  it('should require an email address', async function () {
    const user = await User.create({
      username: 'stanley',
      email: 'stanley@mail.com',
      password: 'stanley',
    });
    const users = await User.findAll();
    expect(users.length).to.equal(3);
  });
  it('should require a password', async function () {
    const user = await User.create({
      username: 'zaina',
      email: 'zaina@mail.com',
      password: 'zaina',
    });
    const users = await User.findAll();
    expect(users.length).to.equal(3);
  });
  it('provided email address is valid email address', async function () {
    const user = await User.create({
      username: 'thompson',
      email: 'thompso@mail.com',
      password: 'thompso',
    });
    const users = await User.findAll();
    expect(users.length).to.equal(3);
  });
  describe('instanceMethods', () => {
    describe('generateToken', () => {
      it('returns a token with the id of the user', async () => {
        const token = await users.cody.generateToken();
        const { id } = await jwt.verify(token, process.env.JWT);
        expect(id).to.equal(users.cody.id);
      });
    }); // end describe('correctPassword')
    describe('authenticate', () => {
      let user;
      beforeEach(
        async () =>
          (user = await User.create({
            username: 'lucy',
            email: 'lucy@mail.com',
            password: 'lucy',
          }))
      );
      describe('with correct credentials', () => {
        it('returns a token', async () => {
          const token = await User.authenticate({
            username: 'lucy',
            email: 'lucy@mail.com',
            password: 'lucy',
          });
          expect(token).to.be.ok;
        });
      });
      describe('with incorrect credentials', () => {
        it('throws a 401', async () => {
          try {
            await User.authenticate({
              username: 'lucy',
              email: 'lucy@mail.com',
              password: '123',
            });
            throw 'nooo';
          } catch (ex) {
            expect(ex.status).to.equal(401);
          }
        });
      });
    }); // end describe('authenticate')
  }); // end describe('instanceMethods')
}); // end describe('User model')
