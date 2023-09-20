const db = require("../db/connection.js");
const PGFormat = require("pg-format");

const selectLessonsByTeacherid = (teacher_id, class_id) => {
  return (
    db
      // .query(`SELECT * FROM lessons WHERE teacher_id = $1;`, [teacher_id])
      .query(
        `SELECT DISTINCT ON (lessons.id) lessons.*, classes.id as class_id
      FROM users
      JOIN users_lessons ON users.id = users_lessons.user_id
      JOIN lessons ON users_lessons.lesson_id = lessons.id
      JOIN classes_users ON users.id = classes_users.user_id
      JOIN classes ON classes_users.class_id = classes.id
      WHERE lessons.teacher_id = $1 AND classes.id = $2
      ORDER BY lessons.id, lessons.created_at DESC;`,
        [teacher_id, class_id]
      )
      .then((response) => {
        if (response.rowCount === 0) {
          return Promise.reject({ status: 404, msg: "Not found" });
        }
        return response.rows;
      })
  );
};

const setLessonsByTeacherIDAndClassID = async (teacher_id, title, body) => {
  return await db
    .query(
      `INSERT INTO lessons (title, body, teacher_id)
  VALUES (
    $1,
    $2,
    $3
    ) RETURNING *;`,
      [title, body, teacher_id]
    )
    .then(({ rows }) => {
      const lesson = rows[0];
      if (!lesson) {
        return Promise.reject({
          status: 404,
          msg: "Not found",
        });
      }
      return lesson;
    });
};

const getUsersIDbyClassID = async (class_id) => {
  return await db
    .query(
      `SELECT users.id FROM classes_users
          JOIN users ON users.id = classes_users.user_id
          WHERE class_id = $1 and role = 'student';
          `,
      [class_id]
    )
    .then(({ rows }) => {
      const usersID = rows;
      if (!usersID) {
        return Promise.reject({
          status: 404,
          msg: "Not found",
        });
      }
      return usersID;
    });
};

const setLessonsByTeacherId = async (teacher_id, class_id, title, body) => {
  try {
    if (!teacher_id || !class_id) {
      throw new Error("Not found");
    }
    if (!title || !body) {
      throw new Error("Bad request");
    }

    const lesson = await setLessonsByTeacherIDAndClassID(
      teacher_id,
      title,
      body
    );

    const lessonId = lesson.id;

    const users = await getUsersIDbyClassID(class_id);
    const usersIDArray = [];
    users.forEach((user) => {
      usersIDArray.push([lessonId, user.id]);
    });

    const sql = PGFormat(
      `INSERT INTO users_lessons (lesson_id, user_id) VALUES %L RETURNING *;`,
      usersIDArray
    );

    return await db.query(sql).then(({ rows }) => {
      if (!rows) {
        return Promise.reject({
          status: 404,
          msg: "Not found",
        });
      }
      return rows;
    });
  } catch (error) {
    if (error.message === "Bad request") {
      return Promise.reject({
        status: 400,
        msg: "Bad request",
      });
    } else if (error.message === "Not found") {
      return Promise.reject({
        status: 404,
        msg: "Not found",
      });
    }
  }
};

module.exports = { selectLessonsByTeacherid, setLessonsByTeacherId };
