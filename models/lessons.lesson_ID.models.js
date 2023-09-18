const db = require('../db/connection.js');

const fetchLessonByID = (id) => {
    return db
    .query(`SELECT * FROM lessons WHERE id = $1;`, [id])
    .then(({ rows }) => {
        const lesson = rows[0];
        if (!lesson) {
            return Promise.reject({
                status: 404,
                msg: 'not found',
            })
        }
        return lesson
    })
};

module.exports = {fetchLessonByID };