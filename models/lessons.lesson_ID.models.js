const db = require('../db/connection.js');

const fetchLessonByID = (lesson_id) => {
    return db
    .query(`SELECT * FROM lessons WHERE id = $1;`, [lesson_id])
    .then(({ rows }) => {
        const lesson = rows[0];
        if (!lesson) {
            return Promise.reject({
                status: 404,
                msg: 'Not found',
            })
        }
        return lesson
    })
};

module.exports = {fetchLessonByID };