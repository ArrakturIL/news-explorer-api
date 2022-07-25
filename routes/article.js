const router = require('express').Router();
const auth = require('../middlewares/auth');

const { createArticle, getArticles, deleteArticle } = require('../controllers/articles');
const { validateNewArticle, validateArticleDelete } = require('./validation/schemas');

router.get('/articles', auth, getArticles);

router.post('/articles', auth, validateNewArticle, createArticle);

router.delete('/articles/:articleId', auth, validateArticleDelete, deleteArticle);

module.exports = router;
