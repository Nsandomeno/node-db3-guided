const express = require('express');

const db = require('../data/db-config.js');
const Users = require('./user-model.js');


const router = express.Router();

router.get('/', (req, res) => {
  db('users')
  .then(users => {
    res.json(users);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('users').where({ id })
  .then(users => {
    const user = users[0];

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get user' });
  });
});

router.post('/', (req, res) => {
  const userData = req.body;

  // db('users').insert(userData)
  addUser(userData)
  .then(ids => {
    res.status(201).json({ created: ids[0] });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to create new user' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('users').where({ id }).update(changes)
  .then(count => {
    if (count) {
      res.json({ update: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to update user' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('users').where({ id }).del()
  .then(count => {
    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user' });
  });
});

// List all posts for a user
router.get('/:id/posts', (req, res) => {
  // .join('table with primary key', 'primary key', 'foreign key')
  db('posts').join('users', 'posts.user_id', 'users.id')
      .select('posts.contents', 'users.username as saidBy')
      .where({user_id : req.params.id}).then((posts) => {
    res.status(200).json(posts)
  }).catch((error) => {
    res.status(500).json({message:"Error Error Error"})
  })
})

function addUser(user) {
  return db('users').insert(user, 'id')
}

module.exports = router;

// Separation of concerns principle 
// - A unit should only have one reason to change
// - Connected to the single responsibility principle