const express = require('express');
const {
  getArticles,
  getArticle,
  patchArticle,
  postArticle,
} = require('../controllers/articles.controller');
const {
  getCommentsForArticle,
  postCommentsForArticle,
} = require('../controllers/comments.controller');

const router = express.Router();

router.get('/:article_id', getArticle);
router.get('', getArticles);
router.patch('/:article_id', patchArticle);
router.get('/:article_id/comments', getCommentsForArticle);
router.post('/:article_id/comments', postCommentsForArticle);
router.post('', postArticle);

module.exports = router;
