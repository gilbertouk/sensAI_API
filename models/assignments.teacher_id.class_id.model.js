const db = require('../db/connection.js');
const PGFormat = require("pg-format")

const setAssignmentByTeacherIDAndClassID = async (teacher_id, title, body, due_date) => {
    return await db
    .query(`INSERT INTO assignments (title, body, teacher_id, due_date, created_at)
    VALUES (
      $1,
      $2,
      $3,
      $4,
      NOW()
      ) RETURNING *;`, [title, body, teacher_id, due_date])
    .then(({ rows }) => {
        const assignment = rows[0]
        if (!assignment) {
            return Promise.reject({
                status: 404,
                message: 'Not found',
            })
        }
        return assignment;
    })
}
const getUsersIDbyClassID = async (class_id) => {
    return await db
    .query(`SELECT users.id FROM classes_users
            JOIN users ON users.id = classes_users.user_id
            WHERE class_id = $1 and role = 'student';
            `, [class_id])
    .then(({ rows }) => {
        const usersID = rows;
        if (!usersID) {
            return Promise.reject({
                status: 404,
                message: 'Not found',
            })
        }
        return usersID;
    })
}

const setUsersAssignmentsbyUserID = async (teacher_id, class_id, title, body, due_date) => {
    try {
        if (!teacher_id  || !class_id ) {
            throw new Error ("Not found")
        }
        if (!title || !body || !due_date) {
            throw new Error ("Bad request")
        }

    const assignment = await setAssignmentByTeacherIDAndClassID (teacher_id, title, body, due_date)
    const assignmentID = assignment.id
    const users = await getUsersIDbyClassID (class_id)
    const usersIDArray = [];
    users.forEach((user) => {
        usersIDArray.push([assignmentID, user.id])
    })
    const sql = PGFormat('INSERT INTO users_assignments (assignment_id, user_id) VALUES %L RETURNING *;', usersIDArray);
    return await db
    .query(sql)
    .then(({rows}) => { 
            if (!rows) {
                return Promise.reject({
                    status: 404,
                    message: 'Not found',
                })
            }
            return rows;
        })
    } catch (error) {
        if (error.message === "Bad request") {
            return Promise.reject({
                status: 400,
                msg: 'Bad request'
            }) 
        } else if (error.message === "Not found") {
            return Promise.reject({
                status: 404,
                msg: 'Not found'
            }) 
        }
    }
}


/*
            INSERT INTO users_assignments (assignment_id, user_id, work, submit_date, mark)
            VALUES (
                (SELECT MAX(id) FROM assignments),
                arr[i]user_id,
                null,
                null,
                null);
*/

//insert into assignments_users
module.exports = {setUsersAssignmentsbyUserID}
// post a assignment to assignments and users_assignments: class ID and teacher ID is in classes users (check is a tacher in users)