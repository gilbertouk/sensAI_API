const db = require("../db/connection.js");


const selectLessonsByTeacherid = (teacher_id, class_id) => {
  return db
    // .query(`SELECT * FROM lessons WHERE teacher_id = $1;`, [teacher_id])
      .query(`SELECT DISTINCT ON (lessons.id) lessons.*, classes.id as class_id
      FROM users
      JOIN users_lessons ON users.id = users_lessons.user_id
      JOIN lessons ON users_lessons.lesson_id = lessons.id
      JOIN classes_users ON users.id = classes_users.user_id
      JOIN classes ON classes_users.class_id = classes.id
      WHERE lessons.teacher_id = $1 AND classes.id = $2
      ORDER BY lessons.id, lessons.created_at DESC;`, [teacher_id, class_id])
    .then((response) => {
      if (response.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return response.rows;
    });
};


module.exports = { selectLessonsByTeacherid };
