const db = require("../db/connection.js");


const selectLessonsByTeacherid = (teacher_id) => {
  return db
    .query(`SELECT * FROM lessons WHERE teacher_id = $1;`, [teacher_id])
    .then((response) => {
      if (response.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return response.rows[0];
    });
};


module.exports = { selectLessonsByTeacherid };
