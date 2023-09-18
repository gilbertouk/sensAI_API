const db = require("../db/connection");

exports.lessonsByStudentId = (student_id) => {
    return db.query(`SELECT ul.lesson_id AS id, l.title, l.body, l.teacher_id, l.created_at
    FROM lessons AS l
    LEFT JOIN users_lessons AS ul
    ON l.id = ul.lesson_id
    WHERE ul.user_id = $1
    `, [student_id]).then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({
                status: 404,
                msg: "Not found"
            })
        }
        return rows;
    })
}