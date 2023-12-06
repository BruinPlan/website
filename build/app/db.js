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
exports.getCourses = exports.addUser = exports.getUser = exports.getUsers = void 0;
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
/* users */
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
        const user = yield querySelect("SELECT * FROM users WHERE id = ?", [id]);
        return user[0];
    });
}
exports.getUser = getUser;
// insert new user
function addUser(first_name, last_name, year_id, major_id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!first_name || !last_name || !year_id || !major_id) {
            return -1;
        }
        const insertId = yield queryInsert("INSERT INTO users (first_name, last_name, year_id, major_id) VALUES (?, ?, ?, ?)", [first_name, last_name, year_id, major_id]);
        return getUser(insertId);
    });
}
exports.addUser = addUser;
/* courses */
// get all courses
function getCourses() {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = yield querySelect("SELECT * FROM courses");
        return courses;
    });
}
exports.getCourses = getCourses;
