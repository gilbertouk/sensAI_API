const format = require('pg-format');

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

const insertUser = (user) => {
    const insertQuery = format (`INSERT INTO users (email, name, surname, disability) 
    VALUES %L 
    RETURNING *`, [[user.email, user.name, user.surname, user.disability]]);
    return db.query(insertQuery)
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

const updateUserById = (userId, updatedData) => {
  const { name, surname, email, disability } = updatedData;

  const query = `
    UPDATE users
    SET
      name = $1,
      surname = $2,
      email = $3,
      disability = $4
    WHERE id = $5
    RETURNING *;
  `;

  const values = [name, surname, email, disability, userId];
  return db.query(query, values)
    .then(({ rows }) => {
      if (!rows || rows.length === 0) {
        return null;
      }

      return rows[0];
    });
};



module.exports = { fetchAllUsers, selectUserByEmail, insertUser, insertUserByEmail, updateUserById };
