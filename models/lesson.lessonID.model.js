const db = require("../db/connection"); 

removeLessonByLessonId = async (lesson_id) => {
    try {
      const deleteUsersLessons = await db.query(
        "DELETE FROM users_lessons WHERE lesson_id = $1",
        [lesson_id]
      );
  
      if (deleteUsersLessons.rowCount === 0) {
        throw new Error("Not found");
      }
  
      const deleteLesson = await db.query(
        `DELETE FROM lessons WHERE id = $1;`,
        [lesson_id]
      );
  
      if (deleteLesson.rowCount === 0) {
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


  module.exports = { removeLessonByLessonId  }