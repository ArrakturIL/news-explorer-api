const MONGODB_DEV_URL = 'mongodb://0.0.0.0:27017/news-explorer';
const JWT_DEV_SECRET = 'dev-secret';

const ERROR_MASSEGES_LIB = {
  LIST_NOT_FOUND: 'Article list is empty.',
  ARTICLE_NOT_FOUND: 'Article not found.',
  DELETE_FORBIDDEN: 'You can\'t delete other\'s article.',
  VALIDATION_FAILED: 'Validation failed.',
  EMAIL_CONFLICT: 'User with this email already exists.',
  USER_NOT_FOUND: 'User not found.',
  LOGIN_REQUIRED: 'Authorization required.',
  RESOURCE_NOT_FOUND: 'Requested resource not found',
  BAD_REQUEST: 'Request canot be processed',
};

module.exports = { MONGODB_DEV_URL, JWT_DEV_SECRET, ERROR_MASSEGES_LIB };
