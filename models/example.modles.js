const format = require('pg-format');
const db = require('../db/connection');

exports.selectArticles = (sort_by = 'created_at', order, topic) => {
  let baseQuery = `SELECT 
  articles.author, 
  articles.title, 
  articles.article_id, 
  articles.article_img_url,
  articles.topic, 
  articles.created_at, 
  articles.votes, 
  COUNT(comments.article_id)::int as comments_count
  FROM articles
  LEFT JOIN comments ON articles.article_id = comments.article_id
`;

  if (topic) {
    baseQuery += format(`WHERE topic = %L `, topic);
  }
  baseQuery += `GROUP BY articles.article_id `;
  if (sort_by !== 'comments_count') {
    baseQuery += format('ORDER BY articles.%s', sort_by);
  } else {
    baseQuery += format('ORDER BY %s', sort_by);
  }
  baseQuery += order === 'ASC' ? ' ASC;' : ' DESC;';

  return db.query(baseQuery).then(({ rows }) => {
    return rows;
  });
};
exports.selectArticle = (article_id) => {
  const queryStr = `SELECT 
  articles.author, 
  articles.body, 
  articles.title, 
  articles.article_id, 
  articles.article_img_url,
  articles.topic, 
  articles.created_at, 
  articles.votes, 
  COUNT(comments.article_id)::int as comments_count
  FROM articles
  LEFT JOIN comments ON articles.article_id = comments.article_id
  WHERE articles.article_id = $1
  GROUP BY articles.article_id;
`;

  return db.query(queryStr, [article_id]).then((response) => {
    if (response.rowCount === 0) {
      return Promise.reject({ status: 404, msg: 'Not found' });
    }
    return response.rows[0];
  });
};

exports.updateArticle = (article_id, inc_votes) => {
  const queryStr = format(
    `UPDATE articles 
  SET votes = votes + %L WHERE article_id = %L RETURNING *;`,
    inc_votes,
    article_id
  );
  return db.query(queryStr).then((response) => {
    if (response.rowCount === 0) {
      return Promise.reject({ status: 404, msg: 'Not found' });
    }
    return response.rows[0];
  });
};
exports.insertArticle = (
  author,
  title,
  body,
  topic,
  article_img_url = 'default.url.uk'
) => {
  const queryStr = format(
    `INSERT INTO articles 
  (author, title, body, topic, article_img_url)
  VALUES %L RETURNING *;`,
    [[author, title, body, topic, article_img_url]]
  );
  return db.query(queryStr).then((response) => {
    return response.rows[0];
  });
};
