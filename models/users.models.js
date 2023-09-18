const db = require('../db/connection.js');

const fetchAllUsers = () => {
    return db
    .query(`SELECT * FROM users;`)
    .then(({ rows }) => {
        return rows;
    })
};

module.exports = {fetchAllUsers };