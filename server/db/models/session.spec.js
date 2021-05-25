const { expect } = require('chai');
const {
  db,
  models: { Session },
} = require('../index');
const seed = require('../../../script/seed');

describe('Session model', () => {
  let sessions;
  beforeEach(async () => {
    sessions = (await seed()).sessions;
    console.log(sessions);
  });

  it('requires a sessionTime', () => {
    //start here
  });
});
