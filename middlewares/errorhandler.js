const { isCelebrateError } = require('celebrate');
const BadRequestErr = require('../errors/bad-request-err');
const { ERROR_MASSEGES_LIB } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    throw new BadRequestErr(ERROR_MASSEGES_LIB.BAD_REQUEST);
  }
  res.status(err.statusCode).send({
    message: err.statusCode === 500 ? 'Internal server error' : err.message,
  });
  next();
};
