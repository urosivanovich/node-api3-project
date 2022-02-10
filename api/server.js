const express = require('express');
const server = express();

const userRouter = require('./users/users-router');
const { logger } = require('../api/middleware/middleware')

server.use(express.json());

// global middlewares and the user's router need to be connected here
server.use('/api/users', logger, userRouter);




server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
