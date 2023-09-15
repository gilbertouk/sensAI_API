const db = require("../db/connection");

exports.lessonsByStudentId = (student_id) => {
    return db.query("SELECT * FROM users_lessons WHERE user_id = $1", [student_id]).then((data) => {
        console.log(data);
    })
}