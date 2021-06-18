'use strict';

const {
  db,
  models: { User, Session, Site, Task, BlackList },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  // console.log('db synced!');
  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', email: 'cody@mail.com' }),
    User.create({
      username: 'murphy',
      password: '123',
      email: 'murphy@mail.com',
    }),
    User.create({
      username: 'jen',
      password: '123',
      email: 'jenmiller2102@gmail.com',
    }),
  ]);

  const cody = users[0];
  const murphy = users[1];
  const jen = users[2];

  // Creating admin Users
  const [felicity, russel, stephan, ding] = await Promise.all(
    [
      ['felicity@mail.com', '123', 'felicity', true],
      ['russel@mail.com', '123', 'russel', true],
      ['stephan@mail.com', '123', 'stephan', true],
      ['ding@mail.com', '123', 'ding', true],
    ].map(([email, password, username, admin]) => {
      return User.create({
        email,
        password,
        username,
        admin,
      });
    })
  );

  //Creating sessions
  const sessionSeeds = [];
  const goals = ['Study', 'Work', 'Read', 'Meditate'];
  for (let i = 0; i < 100; i++) {
    sessionSeeds.push(Session.seed(users, goals));
  }

  const sessions = await Promise.all(sessionSeeds);
  // console.log(`seeded ${sessions.length} sessions`);

  const tasks = await Promise.all([
    Task.create({ name: 'User model' }),
    Task.create({ name: 'All Users route' }),
    Task.create({ name: 'Single User route' }),
  ]);

  //console.log(`seeded ${goals.length} general goals`)

  // Creating sites
  const sites = await Promise.all([
    Site.create({ siteUrl: 'https://twitter.com/', category: 'Social Media' }),
    Site.create({
      siteUrl: 'https://www.instagram.com/',
      category: 'Social Media',
    }),
    Site.create({
      siteUrl: 'https://www.facebook.com/',
      category: 'Social Media',
    }),
    Site.create({
      siteUrl: 'https://www.netflix.com/',
      category: 'Entertainment',
    }),
    Site.create({
      siteUrl: 'https://www.hulu.com/',
      category: 'Entertainment',
    }),
  ]);

  const twitter = sites[0];
  const instagram = sites[1];
  const facebook = sites[2];
  const netflix = sites[3];
  const hulu = sites[4];

  // Creating site and user associations
  await Promise.all([
    BlackList.create({ siteId: twitter.id, userId: cody.id }),
    BlackList.create({ siteId: twitter.id, userId: murphy.id }),
    BlackList.create({ siteId: instagram.id, userId: cody.id }),
    BlackList.create({ siteId: facebook.id, userId: murphy.id }),
    BlackList.create({ siteId: netflix.id, userId: murphy.id }),
    BlackList.create({ siteId: hulu.id, userId: murphy.id }),
    BlackList.create({ siteId: twitter.id, userId: jen.id }),
    BlackList.create({ siteId: facebook.id, userId: jen.id }),
  ]);

  //console.log(`seeded ${blockedSites.length} blacklisted sites`)

  // Creating some tasks

  //console.log(`seeded everything successfully`);
  return {
    users: {
      cody: cody,
      murphy: murphy,
    },
    sessions: {
      session0: sessions[0],
      session1: sessions[1],
      session2: sessions[2],
      session3: sessions[3],
      session4: sessions[4],
    },
    tasks: {
      task0: tasks[0],
      task1: tasks[1],
      task2: tasks[2],
    },
    sites: {
      twitter,
      instagram,
      facebook,
      netflix,
      hulu,
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
