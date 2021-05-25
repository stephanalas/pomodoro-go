const { expect } = require('chai');
const {
  db,
  models: { Site, Blacklist, User },
} = require('../index');

describe('Blacklist Model', function () {
  beforeEach(async () => {
    try {
      await db.sync({ force: true });
      const user1 = await User.create({
        username: 'stanley',
        email: 'stanley@mail.com',
        password: 'stanley',
      });
      const user2 = await User.create({
        username: 'zaina',
        email: 'zaina@mail.com',
        password: 'zaina',
      });
      const user3 = await User.create({
        username: 'thompson',
        email: 'thompso@mail.com',
        password: 'thompso',
      });
      const site1 = await Site.create({
        siteUrl: 'https://stackoverflow.com/',
        category: 'coding helper',
      });
      const site2 = await Site.create({
        siteUrl: 'https://www.instagram.com/',
        category: 'social media',
      });
      const blacklist = await Blacklist.create({
        siteId: site2.id,
        userId: user1.id,
      });
    } catch (err) {
      console.log(err);
    }
  });

  it('Blacklist should return an array', async () => {
    const sites = await Blacklist.findAll();
    expect(sites).to.be.a('array');
    expect(sites.length).to.be.greaterThan(0);
  });
});
