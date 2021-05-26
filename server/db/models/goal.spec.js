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
  it('requires a description', () => {
    //start here
    const { goal0, goal1 } = goals;

    expect(goal0.description).to.equal('Define sequelize models.');
    expect(goal1.description).to.equal('Write express routes.');
  });
});
