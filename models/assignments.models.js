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

module.exports = { updateAssignmentByIdAsTeacher };
