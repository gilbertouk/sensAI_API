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
        return Promise.reject({ status: 404, msg: "Not found" });
      }

      return rows;
    });
};

const fetchStudentAssignmentByAssignmentId = (student_id, assignment_id) => {
  return db
    .query(
      `SELECT users_assignments.id, users_assignments.assignment_id, users_assignments.user_id, 
      users_assignments.work, users_assignments.submit_date, users_assignments.feedback, 
      users_assignments.mark, assignments.title, assignments.body, assignments.teacher_id, 
      assignments.created_at, assignments.due_date FROM users_assignments 
      LEFT JOIN assignments ON assignments.id = users_assignments.assignment_id
      WHERE user_id = $1 and assignment_id = $2;`,
      [student_id, assignment_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }

      return rows;
    });
};

const updateStudentAssignment = (student_id, assignment_id, work) => {
  if (!work) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return db
    .query(
      `UPDATE users_assignments SET work = $1, submit_date = NOW() WHERE user_id = $2 AND assignment_id = $3 RETURNING *`,
      [work, student_id, assignment_id]
    )
    .then((rows) => {
      if (rows.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }

      return rows.rows[0];
    });
};

module.exports = {
  fetchStudentAssignments,
  fetchStudentAssignmentByAssignmentId,
  updateStudentAssignment,
};
