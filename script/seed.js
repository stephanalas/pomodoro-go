'use strict';

const {
  db,
  models: { User, Session, Goal, Site, BlackList, Task },
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
  ]);

  const cody = users[0];
  const murphy = users[1];

  //console.log(`seeded ${users.length} users`);

  //Creating sessions
  const sessions = await Promise.all([
    Session.start({ userId: cody.id, sessionTime: 40 }),
    Session.start({ userId: murphy.id, sessionTime: 50 }),
    Session.start({ userId: murphy.id, sessionTime: 45 }),
    Session.start({ userId: cody.id, sessionTime: 30 }),
    Session.start({ userId: cody.id, sessionTime: 40 }),
    Session.start({ userId: cody.id, sessionTime: 40 }),
    Session.start({ userId: cody.id, sessionTime: 45 }),
    Session.start({ userId: cody.id, sessionTime: 40 }),
    Session.start({ userId: cody.id, sessionTime: 60 }),
    Session.start({ userId: cody.id, sessionTime: 30 }),
    Session.start({ userId: cody.id, sessionTime: 45 }),
    Session.start({ userId: murphy.id, sessionTime: 60 }),
    Session.start({ userId: murphy.id, sessionTime: 120 }),
    Session.start({ userId: murphy.id, sessionTime: 35 }),
    Session.start({ userId: murphy.id, sessionTime: 45 }),
    Session.start({ userId: murphy.id, sessionTime: 50 }),
    Session.start({ userId: murphy.id, sessionTime: 50 }),
    Session.start({ userId: murphy.id, sessionTime: 40 }),
    Session.start({ userId: murphy.id, sessionTime: 60 }),
    Session.start({ userId: murphy.id, sessionTime: 50 }),
    Session.start({ userId: murphy.id, sessionTime: 20 }),
    Session.start({ userId: murphy.id, sessionTime: 45 }),
    Session.start({ userId: murphy.id, sessionTime: 50 }),
  ]);

  sessions.map(async (each) => {
    const randomDay = Math.floor(Math.random() * 30 + 1);
    const randomMonth = Math.floor(Math.random() * 11 + 1);
    // const randomHour = Math.floor(Math.random()*11 + 1)
    if (randomDay < 10 && randomMonth < 10) {
      each.startTime = `2021-0${randomMonth}-0${randomDay}T00:26:01.161Z`; // 2021-05-27T00:26:01.161Z
      const start = Date.parse(each.startTime);
      each.expectedEndTime = start + each.sessionTime * 60000;
    } else if (randomDay < 10 && randomMonth > 10) {
      each.startTime = `2021-${randomMonth}-0${randomDay}T00:26:01.161Z`; // 2021-05-27T00:26:01.161Z
      const start = Date.parse(each.startTime);
      each.expectedEndTime = start + each.sessionTime * 60000;
    } else if (randomDay > 10 && randomMonth < 10) {
      each.startTime = `2021-0${randomMonth}-${randomDay}T00:26:01.161Z`;
      const start = Date.parse(each.startTime);
      each.expectedEndTime = start + each.sessionTime * 60000;
    } else if (randomDay > 10 && randomMonth > 10) {
      each.startTime = `2021-${randomMonth}-${randomDay}T00:26:01.161Z`;
      const start = Date.parse(each.startTime);
      each.expectedEndTime = start + each.sessionTime * 60000;
    }
    await each.save();
  });

  const endLastSession = async () => {
    const last = await Session.start({ userId: murphy.id, sessionTime: 45 });
    last.startTime = `2021-02-11T00:26:01.161Z`;
    const start = Date.parse(last.startTime);
    last.expectedEndTime = start + last.sessionTime * 60000;
    const expected = Date.parse(last.expectedEndTime);
    last.actualEndTime = expected + 5 * 60000;
    last.successful = true;
    await last.save();
    sessions.push(last);
  };

  endLastSession();

  const test = Session.seed(users);

  //console.log(`seeded ${sessions.length} sessions`)

  // Creating goals
  const goals = await Promise.all([
    Goal.create({ description: 'Working' }),
    Goal.create({ description: 'Studying' }),
    Goal.create({ description: 'Reading' }),
    Goal.create({ description: 'Meditating' }),
  ]);
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
  const blockedSites = await Promise.all([
    BlackList.create({ siteId: twitter.id, userId: cody.id }),
    BlackList.create({ siteId: twitter.id, userId: murphy.id }),
    BlackList.create({ siteId: instagram.id, userId: cody.id }),
    BlackList.create({ siteId: facebook.id, userId: murphy.id }),
    BlackList.create({ siteId: netflix.id, userId: murphy.id }),
    BlackList.create({ siteId: hulu.id, userId: murphy.id }),
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
    goals: {
      goal0: goals[0],
      goal1: goals[1],
      goal2: goals[2],
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
