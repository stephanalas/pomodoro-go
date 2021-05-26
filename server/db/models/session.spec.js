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
  it('requires a sessionTime', () => {
    const { session0, session1 } = sessions;

    expect(session0.sessionTime).to.equal(40);
    expect(session1.sessionTime).to.equal(50);
  });
  it('`calcExpectedEndTime` method calculates and adds expectedEndTime attribute to instances as they are created', () => {
    const { session0 } = sessions;
    const expectedEndTime = session0.expectedEndTime;
    const check = new Date(
      Date.parse(session0.createdAt) + session0.sessionTime * 60000
    );
    expect(Date.parse(expectedEndTime)).to.equal(Date.parse(check));
  });
  //using a UUID threw this test off; wasn't able to fix quickly but I'll look into
  it('`createWithUser` class method creates a session with an associated user', async () => {
    const john = await User.create({
      username: 'john',
      password: 'john_pw',
      email: 'john@mail.com',
    });

    const session3 = await Session.createWithUser({
      userId: john.id,
      sessionTime: 30,
    });

    expect(session3.userId).to.equal(john.id);
    expect(session3.sessionTime).to.equal(30);
    expect(session3.expectedEndTime).to.be.ok;
  });
});
