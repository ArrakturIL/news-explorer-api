const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const LoginErr = require('../errors/login-err');
const { JWT_DEV_SECRET, ERROR_MASSEGES_LIB } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new LoginErr(ERROR_MASSEGES_LIB.LOGIN_REQUIRED));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET,
    );
  } catch (err) {
    next(new LoginErr(ERROR_MASSEGES_LIB.LOGIN_REQUIRED));
  }
  req.user = payload;
  next();
};
