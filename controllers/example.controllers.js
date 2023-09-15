const {
  selectArticles,
  selectArticle,
  updateArticle,
  insertArticle,
} = require('../models/articles.modles');
const { isTopicExists } = require('../models/topics.models');

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  const promises = [
    isTopicExists(topic),
    selectArticles(sort_by, order, topic),
  ];
  return Promise.all(promises)
    .then(([isTopicExists, articles]) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      return next(err);
    });
};

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;
  return selectArticle(article_id)
    .then((article) => res.status(200).send({ article }))
    .catch((err) => {
      return next(err);
    });
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  return updateArticle(article_id, inc_votes)
    .then((article) => res.status(200).send({ article }))
    .catch((err) => {
      return next(err);
    });
};

exports.postArticle = (req, res, next) => {
  const { author, title, body, topic, article_img_url } = req.body;
  return insertArticle(author, title, body, topic, article_img_url)
    .then((article) =>
      res.status(200).send({ article: { ...article, comment_count: 0 } })
    )
    .catch((err) => {
      return next(err);
    });
};
