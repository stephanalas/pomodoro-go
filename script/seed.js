'use strict';

const {
  db,
  models: { User, Session, Goal },
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

  // console.log(`seeded ${users.length} users`);

  const sessions = await Promise.all([
    Session.createWithUser({ userId: cody.id, sessionTime: 40 }),
    Session.createWithUser({ userId: murphy.id, sessionTime: 50 }),
    Session.createWithUser({ userId: murphy.id, sessionTime: 45 }),
  ]);

  const goals = await Promise.all([
    Goal.create({ description: 'Define sequelize models.' }),
    Goal.create({ description: 'Write express routes.' }),
    Goal.create({ description: 'Create redux store' }),
  ]);
  const tasks = await Promise.all([
    Task.create({ name: 'User model' }),
    Task.create({ name: 'All Users route' }),
    Task.create({ name: 'Single User route' }),
  ]);
  // console.log(`seeded successfully`);

  return {
    users: {
      cody: cody,
      murphy: murphy,
    },
    sessions: {
      session0: sessions[0],
      session1: sessions[1],
      session2: sessions[2],
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
