const { lessonsByStudentId } = require("../models/lessonsDataByStudentId");

exports.getLessonsByStudentId = (req, res, next) => {
    const {student_id} = req.params;
    
    lessonsByStudentId(student_id).then((res) => {
        res.status(200).send({lessons: ["hello"]});
    })
}