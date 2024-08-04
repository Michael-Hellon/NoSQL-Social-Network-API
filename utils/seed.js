const connection = require('../config/connection');
const { Thought, User, Reaction } = require('../models');
const { getRandomName, getRandomReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thought');
    }

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }


  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    // Get some random reaction objects using a helper function that we imported from ./data
    const thoughts = getRandomReactions(20);

    const user = getRandomName();
     const email = `${user}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    users.push({
      username,
      email,
      thoughts,
    });
  }

  // Add users to the collection and await the results
  const userData = await User.create(users);

  // Add courses to the collection and await the results
  await Thought.create({
    thoughtName: 'Happy',

    users: [...userData.map(({_id}) => _id)],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
