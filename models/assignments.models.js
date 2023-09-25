const db = require("../db/connection.js");
const PGFormat = require("pg-format");

const updateAssignmentByIdAsTeacher = async (assignment_id, mark, feedback) => {
  const result = await db.query(
    `UPDATE users_assignments 
      SET mark = $2, feedback = $3 
      WHERE assignment_id = $1 RETURNING *;`,
    [assignment_id, mark, feedback]
  );
  if (result.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: "Not found",
    });
  }
  // console.log(result.rows[0]);
  return result.rows[0];
};

const selectAssignmentById = async (assignment_id) => {
  const result = await db.query(
    `SELECT
    users_assignments.id AS users_assignments_id,
    users.name AS user_name,
    users.surname AS user_surname,
    users.email AS user_email,
    users.role AS user_role,
    users.created_at AS user_created_at,
    users.disability AS user_disability,
    assignments.title AS assignment_title,
    assignments.body AS assignment_body,
    assignments.teacher_id AS assignment_teacher_id,
    assignments.created_at AS assignment_created_at,
    assignments.due_date AS assignment_due_date,
    users_assignments.work AS users_assignments_work,
    users_assignments.submit_date AS users_assignments_submit_date,
    users_assignments.feedback AS users_assignments_feedback,
    users_assignments.mark AS users_assignments_mark
  FROM users_assignments
  JOIN users ON users_assignments.user_id = users.id
  JOIN assignments ON users_assignments.assignment_id = assignments.id
  WHERE users_assignments.id = $1;`,
    [assignment_id]
  );
  if (result.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: "Not found",
    });
  }
  return result.rows[0];
};

module.exports = { updateAssignmentByIdAsTeacher, selectAssignmentById };
