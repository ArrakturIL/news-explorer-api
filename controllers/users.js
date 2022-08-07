const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_DEV_SECRET, ERROR_MASSEGES_LIB } = require('../utils/constants');

const User = require('../models/user');
const NotFoundErr = require('../errors/not-found-err');
const BadRequestErr = require('../errors/bad-request-err');
const LoginErr = require('../errors/login-err');
const ConflictErr = require('../errors/conflict-err');

const getUserList = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    }).catch(next);
}

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send({ email: user.email, name: user.name });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr(ERROR_MASSEGES_LIB.VALIDATION_FAILED));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      name,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({
        email: user.email,
        name: user.name,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestErr(ERROR_MASSEGES_LIB.VALIDATION_FAILED));
      else if (err.code === 11000) next(new ConflictErr(ERROR_MASSEGES_LIB.EMAIL_CONFLICT));
      else next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr(ERROR_MASSEGES_LIB.USER_NOT_FOUND);
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET,
        { expiresIn: '7d' },
      );
      res
        .cookie('token', token, {
          httpOnly: true,
        })
        .status(200)
        .send({
          token,
          user: {
            email: user.email,
            name: user.name,
          },
        });
    })
    .catch(() => {
      next(new LoginErr(ERROR_MASSEGES_LIB.LOGIN_REQUIRED));
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
  getUserList,
};
