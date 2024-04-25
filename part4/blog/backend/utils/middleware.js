const logger = require('./logger');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, _, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    logger.info('KnownIssue');
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' });
  }

  next(error);
};

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  } else {
    return null;
  }

};

const userExtractor = async (request, response, next) => {
  const token = getTokenFrom(request)
  if (!token) {
    return response.status(401).json({ error: 'token missing' });
  }
  
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(401).json({ error: 'user not found' });
  }

  request.user = user;
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
};
