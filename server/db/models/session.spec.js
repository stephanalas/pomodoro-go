const { expect } = require('chai');
const {
  db,
  models: { Session, User },
} = require('../index');
const seed = require('../../../script/seed');

describe('Session model', () => {
  let sessions;
  beforeEach(async () => {
    users = (await seed()).users;

    sessions = (await seed()).sessions;
  });

  it('`createWithUser` class method creates a session with an associated user', async () => {
    //start here
    const session3 = await Session.createWithUser({
      userId: 1,
      sessionTime: 30,
    });
    console.log('session3:', session3);
    // expect(session0.sessionTime).to.equal(40);
  });
  it('requires a sessionTime', () => {
    //start here
    const { session0, session1 } = sessions;

    expect(session0.sessionTime).to.equal(40);
    expect(session1.sessionTime).to.equal(50);
  });
  it('has a hook that calculates an expectedEndTime as instances are created', () => {
    const { session0 } = sessions;
    const expectedEndTime = session0.expectedEndTime;
    const check = new Date(
      Date.parse(session0.createdAt) + session0.sessionTime * 60000
    );
    expect(Date.parse(expectedEndTime)).to.equal(Date.parse(check));
  });
});
