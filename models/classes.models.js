const db = require("../db/connection.js");
const PGFormat = require("pg-format");

const selectStudentsByClassID = async (class_id) => {
  return await db
    .query(
      `SELECT * FROM classes_users
            JOIN users ON users.id = classes_users.user_id
            WHERE class_id = $1 and role = 'student';
            `,
      [class_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Not found",
        });
      }
      return rows;
    });
};

module.exports = { selectStudentsByClassID };
