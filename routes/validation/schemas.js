const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

function validateUrl(url) {
  if (!validator.isURL(url)) {
    throw new Error('Invalid URL');
  }
  return url;
}

function validateEmail(email) {
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email');
  }
  return email;
}

const validateNewArticle = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    keyword: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validateUrl),
    image: Joi.string().required().custom(validateUrl),
  }),
});

const validateArticleDelete = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().min(24).max(24)
      .hex(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required().min(6),
  }),
});

module.exports = {
  validateNewArticle,
  validateArticleDelete,
  validateCreateUser,
  validateLogin,
};
