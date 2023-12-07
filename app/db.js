import mysql from 'mysql2'
import config from './config.js'

const pool = mysql.createPool(config.db).promise()

// select statement (read)
async function querySelect(query, params=[]) {
    const [rows] = await pool.query(query, params)
    return rows
}

// insert statement (create)
async function queryInsert(query, params=[]) {
    const [result] = await pool.query(query, params)
    return result.insertId
}

// get all users
async function getUsers() {
    const users = await querySelect("SELECT * from users")
    return users
}

// get user by id
async function getUser(id) {
    const user = await querySelect("SELECT * FROM users WHERE google_id = ?", [id])
    return user[0]
}

// insert new user
async function addUser(first_name, last_name, year_id, major_id, google_id) {
    if (!first_name || !last_name || !year_id || !major_id || !google_id) {
        return -1
    }

    const insertId = await queryInsert("INSERT INTO users (first_name, last_name, year_id, major_id, google_id) VALUES (?, ?, ?, ?, ?)", 
        [first_name, last_name, year_id, major_id, google_id])

    return getUser(insertId)
}

export { getUsers, getUser, addUser }