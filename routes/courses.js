var express = require('express');
var router = express.Router();

const User = require('../models').User;
const { asyncHandler } = require('../middleware/asyncHandler');
const { authenticateUser } = require('../middleware/auth');

const { Course } = require('../models'); // Fixed import statement

// GET /api/courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: [{
        model: User,
        attributes: ['firstName', 'lastName', 'emailAddress']
      }]
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/courses/:id - Returns a course by id
router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: [{
        model: User,
        attributes: ['firstName', 'lastName', 'emailAddress']
      }]
    });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route that creates a new course.
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
  try {
    const course = await Course.create(req.body);
    const courseId = await course.id;
    let courseLocation = `/courses/${courseId}`;
    res.location(courseLocation).status(201).end();
  } catch (error) {
    console.log('ERROR: ', error.name);
    console.log('ERROR details: ', error.errors);

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

// Route that updates a course.
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  try {
    //check if course exists
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    //check if user is the owner of the course
    if (course.userId !== req.currentUser.id) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }
    //update course
    await Course.update(req.body, { where: { id: req.params.id } });
    res.status(204).end();
  } catch (error) {
    console.log('ERROR: ', error.name);
    console.log('ERROR details: ', error.errors);

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));


// Route that deletes a course.
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    //check if course exists
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    if (course.userId !== req.currentUser.id) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }
    // RIP to course
    await Course.destroy({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (error) {
    console.log('ERROR: ', error.name);
    console.log('ERROR details: ', error.errors);

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));



module.exports = router;