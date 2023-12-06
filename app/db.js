import mysql from 'mysql2'
import config from './config.js'

const pool = mysql.createPool(config.db).promise()

/* general statements */

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

/* users */

// get all users
async function getUsers() {
    const users = await querySelect("SELECT * FROM users")
    return users
}

// get user by id
async function getUser(id) {
    const user = await querySelect("SELECT * FROM users WHERE id = ?", [id])
    return user[0]
}

// insert new user
async function addUser(first_name, last_name, year_id, major_id) {
    if (!first_name || !last_name || !year_id || !major_id) {
        return -1
    }

    const insertId = await queryInsert("INSERT INTO users (first_name, last_name, year_id, major_id) VALUES (?, ?, ?, ?)", 
        [first_name, last_name, year_id, major_id])

    return getUser(insertId)
}

/* courses */

// get all courses
async function getCourses() {
    const courses = await querySelect("SELECT * FROM courses")
    return courses
}

/* schedule entries */

// get schedule entry by id
async function getScheduleEntry(id) {
    const user = await querySelect("SELECT * FROM schedule_entries WHERE id = ?", [id])
    return user[0]
}

// insert new schedule entry
async function addScheduleEntry(user_id, course_id, year_id, quarter_id) {
    if (!user_id || !course_id || !year_id || !quarter_id) {
        return -1
    }

    const insertId = await queryInsert("INSERT INTO schedule_entries (user_id, course_id, year_id, quarter_id) VALUES (?, ?, ?, ?)",
        [user_id, course_id, year_id, quarter_id])

    return getScheduleEntry(insertId)
}

export { getUsers, getUser, addUser, getCourses, addScheduleEntry }