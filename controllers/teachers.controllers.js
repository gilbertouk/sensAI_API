const { getAssignDataByTeacherClass } = require("../models/teachers.models");


exports.getAssignmentsByTeacherClassId = (req, res, next) => {
    const {teacher_id, class_id} = req.params;

    getAssignDataByTeacherClass(teacher_id, class_id).then((assignments)=> {
        res.status(200).send({assignments});
    }).catch((err) => {
        next(err);
    })
}