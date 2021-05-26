const { expect } = require('chai');
const {
  db,
  models: { Task },
} = require('../index');
const seed = require('../../../script/seed');

describe('Goal model', () => {
  let goals;
  beforeEach(async () => {
    tasks = (await seed()).tasks;
  });
  it('requires a name', () => {
    //start here
    const { task0, task2 } = tasks;

    expect(task0.name).to.equal('User model');
    expect(task2.name).to.equal('Single User route');
  });
});
