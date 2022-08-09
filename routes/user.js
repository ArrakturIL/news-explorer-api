const router = require('express').Router();
const {
  createUser, login, getCurrentUser, getUserList,
} = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('./validation/schemas');
const auth = require('../middlewares/auth');

router.get('/users', getUserList);

router.get('/users/me', auth, getCurrentUser);

router.post('/signup', validateCreateUser, createUser);

router.post('/signin', validateLogin, login);

module.exports = router;
