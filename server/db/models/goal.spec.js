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
  it('requires a task', () => {
    //start here
    const { goal0, goal1 } = goals;

    expect(goal0.task).to.equal('Define sequelize models.');
    expect(goal1.task).to.equal('Write express routes.');
  });
});
