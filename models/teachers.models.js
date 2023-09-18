const db = require("../db/connection");

exports.getAssignDataByTeacherClass = () => {
    return db.query(`SELECT *
    FROM users_assignments
    JOIN classes_users
    ON users_assignments.user_id = classes_users.user_id`).then(({rows})=> {
        console.log(rows);
    })
}


// return db.query(`SELECT * FROM classes_users WHERE user_id = $1`, [101]).then(({rows})=> {
//     console.log(rows);
// })
// Finds teacher and class_id from classes_users