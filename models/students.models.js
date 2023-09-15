const db = require("../db/connection.js");

const fetchStudentAssignments = (student_id) => {
  return db
    .query(
      `SELECT * FROM assignments 
  RIGHT JOIN users_assignments ON users_assignments.assignment_id = assignments.id
  WHERE users_assignments.user_id = $1`,
      [student_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Resource not found" });
      }

      return rows;
    });
};

module.exports = { fetchStudentAssignments };
