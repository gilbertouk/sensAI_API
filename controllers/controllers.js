const { fetchAllUsers } = require('./models.js')
//const endpoints = require('../endpoints.json')

const getAllUsers = (req, res, next) => {
    fetchAllUsers().then((users) => {
        res.status(200).send({users})
        console.log({users}, "in controller")
    }).catch(error => {
        next(error)
    })
}

module.exports = {getAllUsers}
