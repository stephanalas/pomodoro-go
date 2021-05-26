const { expect } = require('chai');
const {
  db,
  models: { Task },
} = require('../index');
const seed = require('../../../script/seed');

describe('Task model', () => {
  let tasks;
  beforeEach(async () => {
    tasks = (await seed()).tasks;
  });
  it('requires a name', async () => {
    try {
      const task = await Task.create();
    } catch (error) {
      expect(error).to.be.ok;
    }
  });
  it("name can't be empty string", async () => {
    try {
      const task = await Task.create({ name: '' });
    } catch (error) {
      expect(error).to.be.ok;
    }
  });
  it('creates a task instance with a name', async () => {
    try {
      const task = await Task.create({ description: 'Create Nav component' });
      expect(task.description).to.equal('Create Nav component');
    } catch (error) {}
  });
});
