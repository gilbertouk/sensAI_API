const { fetchLessonByID } = require('../models/lessons.lesson_ID.models.js')

const getLessonByID = (req, res, next) => {
    const {lesson_id} = req.params
    fetchLessonByID(lesson_id).then((lessons) => {
    res.status(200).send({lessons})
    }).catch(error => {
        next(error);
    });
}

module.exports = {getLessonByID}
