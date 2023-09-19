const {fetchClassesByTeacherID } = require('../models/classes.teacher_ID.model.js')

const getClassesByTeacherID = (req, res, next) => {
    const {teacher_id} = req.params
    fetchClassesByTeacherID(teacher_id).then((classes) => {
    res.status(200).send({classes})
    }).catch(error => {
        next(error);
    });
}

module.exports = {getClassesByTeacherID}