const { getAssignDataByTeacherClass } = require("../models/teachers.models");


exports.getAssignmentsByTeacherClassId = (req, res, next) => {
    getAssignDataByTeacherClass().then((data)=> {
        res.status(200).send({});
    })
}