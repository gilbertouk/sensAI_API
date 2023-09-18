const {fetchClassesByTeacherID } = require('../models/classes.teacher_ID.model.js')

const getClassesByTeacherID = (req, res, next) => {
    const {teacher_id} = req.params
    fetchClassesByTeacherID(teacher_id).then((classes) => {
        console.log({classes}, "in controller line 6")
    res.status(200).send({classes})
    console.log({teachers}, "in controller line 7")
    }).catch(error => {
        next(error);
    });
}

module.exports = {getClassesByTeacherID}