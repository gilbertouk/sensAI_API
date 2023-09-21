const db = require("../db/connection");

removeLessonByLessonIdAndUserId = (
    lesson_id,
    user_id
  ) => {
    return db
      .query(
        `DELETE FROM users_lessons WHERE lesson_id = $1 AND user_id = $2;`,
        [lesson_id, user_id]
      )
      .then((response) => {
        if (response.rowCount === 0) {
          return Promise.reject({ status: 404, msg: "Not found" });
        }
        return response.rows;
      });
  };


  module.exports = { removeLessonByLessonIdAndUserId  }
