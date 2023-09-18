const db = require('../db/connection.js');

const fetchClassesByTeacherID = (teacher_id) => {
    return db
    .query(`SELECT *
    FROM classes
    WHERE id IN (SELECT class_id FROM classes_users WHERE user_id = $1);
    `, [teacher_id])
    .then(({ rows }) => {
        const classes = rows;
        console.log(rows, "in model ln 11")
        if (classes.length === 0) {
            return Promise.reject({
                status: 404,
                msg: 'Not found',
            })
        }
        return classes
    })
};

module.exports = {fetchClassesByTeacherID}


