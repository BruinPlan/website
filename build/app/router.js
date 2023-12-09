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
const express_1 = __importDefault(require("express"));
const db_js_1 = require("./db.js");
const router = express_1.default.Router();
/* =============== users =============== */
// get all users
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, db_js_1.getUsers)();
    res.send(users);
}));
// get user by id
router.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield (0, db_js_1.getUser)(id);
    res.send(user);
}));
// add user
router.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, year_id, major_id } = req.body;
    const user = yield (0, db_js_1.addUser)(first_name, last_name, year_id, major_id);
    res.status(201).send(user);
}));
/*  =============== courses  =============== */
// get all courses
router.get("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield (0, db_js_1.getCourses)();
    res.send(courses);
}));
/*  =============== schedule entries =============== */
// get schedule entries by user id
router.get("/schedule-entries/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.params.user_id;
    const user = yield (0, db_js_1.getScheduleEntries)(user_id);
    res.send(user);
}));
// add schedule entry
router.post("/schedule-entries", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, course_id, year_name, quarter_name } = req.body;
    const schedule_entry = yield (0, db_js_1.addScheduleEntry)(user_id, course_id, year_name, quarter_name);
    res.status(201).send(schedule_entry);
}));
// delete schedule entry
router.post("/schedule-entries/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, quarter } = req.body;
    const result = yield (0, db_js_1.updateScheduleEntry)(id, quarter);
    res.status(200).send(result);
}));
exports.default = router;
