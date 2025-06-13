var express = require('express');
var router = express.Router();

const User = require('../models').User;
const { asyncHandler } = require('../middleware/asyncHandler');
const { authenticateUser } = require('../middleware/auth');

// GET /api/users - Returns all users
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.currentUser.id, {
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
  });
  res.json(user);
}));

// Route that creates a new user.
router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.location('/').status(201).end();
  } catch (error) {
    console.log('ERROR: ', error.name);
    console.log('ERROR details: ', error.errors);

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else if (error.message === 'Passwords do not match') {
      res.status(400).json({ errors: [error.message] });
    } else {
      throw error;
    }
  }
}));


module.exports = router;