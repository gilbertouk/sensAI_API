const { setUsersAssignmentsbyUserID } = require('../models/assignments.teacher_id.class_id.model.js')

const postAssignmentsByTeacherIDAndClassID = (req, res, next) => {
 const {teacher_id, class_id} = req.params
 const {title, body, due_date} = req.body
 setUsersAssignmentsbyUserID(teacher_id, class_id, title, body, due_date).then((assignments) => {
    res.status(200).send({assignments})
 }).catch(error => {
    next(error);
 })
}


// post a assignment to assignments and users_assignments: class ID and teacher ID is in classes users (check is a tacher in users)
module.exports = {postAssignmentsByTeacherIDAndClassID}