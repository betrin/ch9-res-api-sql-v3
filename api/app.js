'use strict';

// load modules
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const bcryptjs = require('bcryptjs');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'fsjstd-restapi.db',
});

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');

// Import models
const { User, Course } = require('./models');

// create the Express app
const app = express();

// Enable All CORS Requests
app.use(cors());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// Add JSON parsing middleware
app.use(express.json());

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

app.use('/api', usersRouter);
app.use('/api', coursesRouter);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// Seed data
const seedData = require('./seed/data.json');

// start listening on our port
sequelize.sync({ force: true })
  .then(async () => {
    // Seed the database after syncing
    try {
      // Hash passwords and create users
      for (const userData of seedData.users) {
        const hashedPassword = await bcryptjs.hash(userData.password, 10);
        await User.create({
          firstName: userData.firstName,
          lastName: userData.lastName,
          emailAddress: userData.emailAddress,
          password: hashedPassword
        });
      }
      console.log('Users seeded successfully!');

      // Create courses
      for (const courseData of seedData.courses) {
        await Course.create({
          userId: courseData.userId,
          title: courseData.title,
          description: courseData.description,
          estimatedTime: courseData.estimatedTime,
          materialsNeeded: courseData.materialsNeeded
        });
      }
      console.log('Courses seeded successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
    }

    const server = app.listen(app.get('port'), () => {
      console.log(`Express server is listening on port ${server.address().port}`);
    });
  });
