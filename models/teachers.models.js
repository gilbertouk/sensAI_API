const db = require("../db/connection");

exports.getAssignDataByTeacherClass = (teacher_id, class_id) => {
  return db
    .query(
      `
    SELECT DISTINCT ON (assignments.id) assignments.*, classes.id as class_id
          FROM users
          JOIN users_assignments ON users.id = users_assignments.user_id
          JOIN assignments ON users_assignments.assignment_id = assignments.id
          JOIN classes_users ON users.id = classes_users.user_id
          JOIN classes ON classes_users.class_id = classes.id
          WHERE assignments.teacher_id = $1 and classes.id = $2
    `,
      [teacher_id, class_id]
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

exports.removeUserAssignmentByUserIdAndAssignmentId = (
  assignment_id,
  user_id
) => {
  return db
    .query(
      `DELETE FROM users_assignments WHERE assignment_id = $1 AND user_id = $2;`,
      [assignment_id, user_id]
    )
    .then((response) => {
      if (response.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return response.rows;
    });
};

exports.getAssignmentData = (teacher_id) => {
  return db
    .query(
      `
    SELECT users_assignments.*, classes_users.class_id
          FROM users
          JOIN users_assignments ON users.id = users_assignments.user_id
          JOIN assignments ON users_assignments.assignment_id = assignments.id
          JOIN classes_users ON users.id = classes_users.user_id
          JOIN classes ON classes_users.class_id = classes.id
          WHERE assignments.teacher_id = $1
    `,
      [teacher_id]
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

exports.removeAssignmentsByAssignmentId = async (assignment_id) => {
  try {
    const deleteUsersAssignment = await db.query(
      "DELETE FROM users_assignments WHERE assignment_id = $1",
      [assignment_id]
    );

    if (deleteUsersAssignment.rowCount === 0) {
      throw new Error("Not found");
    }

    const deleteAssignment = await db.query(
      `DELETE FROM assignments WHERE id = $1;`,
      [assignment_id]
    );

    if (deleteAssignment.rowCount === 0) {
      throw new Error("Not found");
    }

    return;
  } catch (err) {
    if (err.message === "Not found") {
      return Promise.reject({ status: 404, msg: "Not found" });
    }

    return Promise.reject(err);
  }
};
