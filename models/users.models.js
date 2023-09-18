const db = require("../db/connection.js");

const fetchAllUsers = () => {
  return db.query(`SELECT * FROM users;`).then(({ rows }) => {
    return rows;
  });
};

const selectUserByEmail = (email) => {
  return db
    .query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then((response) => {
      if (response.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return response.rows[0];
    });
};
const insertUserByEmail = (email) => {
  return db
    .query("INSERT INTO users (email) VALUES ($1) RETURNING *", [email])
    .then(({ rows }) => {
        if (!rows) {
            return Promise.reject({
                status: 404,
                msg: 'Not found',
            })
        }

      return rows[0];
    });
};

module.exports = { fetchAllUsers, selectUserByEmail, insertUserByEmail };
