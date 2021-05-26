const { expect } = require('chai');
const {
  db,
  models: { Goal },
} = require('../index');
const seed = require('../../../script/seed');

describe('Goal model', () => {
  let goals;
  beforeEach(async () => {
    goals = (await seed()).goals;
  });
  it('requires a description', async () => {
    try {
      const goal = await Goal.create({});
    } catch (error) {
      expect(error).to.be.ok;
    }
  });
  it("description can't be empty string", async () => {
    try {
      const goal = await Goal.create({ description: '' });
    } catch (error) {
      expect(error).to.be.ok;
    }
  });
  it('creates a goal instance with a description', async () => {
    try {
      const goal = await Goal.create({ description: 'Write front end' });
      expect(goal.description).to.equal('Write front end');
    } catch (error) {}
  });
});
