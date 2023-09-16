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

module.exports = { fetchAllUsers, selectUserByEmail };
