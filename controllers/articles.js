const Article = require('../models/article');

const NotFoundErr = require('../errors/not-found-err');
const ForbiddenErr = require('../errors/forbidden-err');
const ERROR_MASSEGES_LIB = require('../utils/constants');

const getArticles = (req, res, next) => {
  Article.find({})
    .select('+owner')
    .then((articles) => {
      const userArticles = articles.filter(
        (article) => String(article.owner) === req.user._id,
      );
      if (userArticles.length === 0) {
        next(new NotFoundErr(ERROR_MASSEGES_LIB.LIST_NOT_FOUND));
        return;
      }
      res.status(200).send(userArticles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  Article.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((article) => {
      res.status(201).send(article);
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('owner')
    .then((foundArticle) => {
      if (!foundArticle) {
        next(new NotFoundErr(ERROR_MASSEGES_LIB.ARTICLE_NOT_FOUND));
        return;
      }
      if (String(foundArticle.owner) !== req.user._id) {
        next(new ForbiddenErr(ERROR_MASSEGES_LIB.DELETE_FORBIDDEN));
        return;
      }
      Article.findByIdAndDelete(req.params.articleId)
        .then(() => {
          Article.find({}).then((allArticles) => res.send(allArticles));
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
