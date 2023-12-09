"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateScheduleEntry = exports.addScheduleEntry = exports.getScheduleEntries = exports.getCourses = exports.addUser = exports.getUser = exports.getUsers = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const config_js_1 = __importDefault(require("./config.js"));
const pool = mysql2_1.default.createPool(config_js_1.default.db).promise();
/* general statements */
// select statement (read)
function querySelect(query, params = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const [rows] = yield pool.query(query, params);
        return rows;
    });
}
// insert statement (create)
function queryInsert(query, params = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield pool.query(query, params);
        return result.insertId;
    });
}
// update statement (create)
function queryUpdate(query, params = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield pool.query(query, params);
        return result.affectedRows;
    });
}
/* =============== users =============== */
// get all users
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield querySelect("SELECT * FROM users");
        return users;
    });
}
exports.getUsers = getUsers;
// get user by id
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield querySelect("SELECT * FROM users WHERE google_id = ?", [id]);
        return user[0];
    });
}
exports.getUser = getUser;
// insert new user
function addUser(first_name, last_name, year_id, major_id, google_id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!first_name)
            first_name = '';
        if (!last_name)
            last_name = '';
        // if (!first_name || !last_name || !year_id || !major_id || !google_id) {
        //     return -1
        // }
        const insertId = yield queryInsert("INSERT INTO users (first_name, last_name, year_id, major_id, google_id) VALUES (?, ?, ?, ?, ?)", [first_name, last_name, year_id, major_id, google_id]);
        return getUser(insertId);
    });
}
exports.addUser = addUser;
/* =============== courses =============== */
// get all courses
function getCourses() {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = yield querySelect(`SELECT c.id, sa.name AS subjectArea, catalog_number AS catalogNumber, title, units, description 
                                        FROM courses c 
                                        JOIN subject_areas sa ON c.subject_area_id = sa.id`);
        return courses;
    });
}
exports.getCourses = getCourses;
/* =============== schedule entries =============== */
// get schedule entries by user id
function getScheduleEntries(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const scheduleEntries = yield querySelect(`SELECT se.id, se.course_id, y.name AS year, q.name AS quarter
                                                FROM schedule_entries se
                                                JOIN years y ON se.year_id = y.id
                                                JOIN quarters q ON se.quarter_id = q.id
                                                WHERE user_id = ?`, [user_id]);
        return scheduleEntries;
    });
}
exports.getScheduleEntries = getScheduleEntries;
// get schedule entry by id
function getScheduleEntry(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const scheduleEntry = yield querySelect("SELECT * FROM schedule_entries WHERE id = ?", [id]);
        return scheduleEntry[0];
    });
}
// insert new schedule entry
function addScheduleEntry(user_id, course_id, year_name, quarter_name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user_id || !course_id || !year_name || !quarter_name) {
            return -1;
        }
        const insertId = yield queryInsert(`INSERT INTO schedule_entries (user_id, course_id, year_id, quarter_id) 
                                        VALUES (?, ?, 
                                            (SELECT id FROM years WHERE years.name = ?),
                                            (SELECT id FROM quarters WHERE quarters.name = ?))`, [user_id, course_id, year_name, quarter_name]);
        return getScheduleEntry(insertId);
    });
}
exports.addScheduleEntry = addScheduleEntry;
// update schedule entry
function updateScheduleEntry(id, quarter) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id || !quarter) {
            return -1;
        }
        const affectedRows = yield queryUpdate(`UPDATE schedule_entries SET quarter_id = 
                                        (SELECT id FROM quarters WHERE quarters.name = ?)
                                        WHERE id = ?`, [quarter, id]);
        if (!affectedRows) {
            return -1;
        }
        return getScheduleEntry(id);
    });
}
exports.updateScheduleEntry = updateScheduleEntry;
