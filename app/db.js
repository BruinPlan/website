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

// update statement (create)
async function queryUpdate(query, params=[]) {
    const [result] = await pool.query(query, params)
    return result.affectedRows
}

/* =============== users =============== */

// get all users
async function getUsers() {
    const users = await querySelect("SELECT * FROM users")
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

/* =============== courses =============== */

// get all courses
async function getCourses() {
    const courses = await querySelect(`SELECT c.id, sa.name AS subjectArea, catalog_number AS catalogNumber, title, units, description 
                                        FROM courses c 
                                        JOIN subject_areas sa ON c.subject_area_id = sa.id`)
    return courses
}

/* =============== schedule entries =============== */

// get schedule entries by user id
async function getScheduleEntries(user_id) {
    const scheduleEntries = await querySelect(`SELECT se.id, se.course_id, y.name AS year, q.name AS quarter
                                                FROM schedule_entries se
                                                JOIN years y ON se.year_id = y.id
                                                JOIN quarters q ON se.quarter_id = q.id
                                                WHERE user_id = ?`, [user_id])
    return scheduleEntries
}

// get schedule entry by id
async function getScheduleEntry(id) {
    const scheduleEntry = await querySelect("SELECT * FROM schedule_entries WHERE id = ?", [id])
    return scheduleEntry[0]
}

// insert new schedule entry
async function addScheduleEntry(user_id, course_id, year_name, quarter_name) {
    if (!user_id || !course_id || !year_name || !quarter_name) {
        return -1
    }

    const insertId = await queryInsert(`INSERT INTO schedule_entries (user_id, course_id, year_id, quarter_id) 
                                        VALUES (?, ?, 
                                            (SELECT id FROM years WHERE years.name = ?),
                                            (SELECT id FROM quarters WHERE quarters.name = ?))`,
                                        [user_id, course_id, year_name, quarter_name])

    return getScheduleEntry(insertId)
}

// update schedule entry
async function updateScheduleEntry(id, quarter) {
    if (!id || !quarter) {
        return -1
    }

    const affectedRows = await queryUpdate(`UPDATE schedule_entries SET quarter_id = 
                                        (SELECT id FROM quarters WHERE quarters.name = ?)
                                        WHERE id = ?`, [quarter, id])
    if (!affectedRows) {
        return -1
    }
    return getScheduleEntry(id)
}

export { getUsers, getUser, addUser, getCourses, getScheduleEntries, addScheduleEntry, updateScheduleEntry }