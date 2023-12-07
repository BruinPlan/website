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
exports.authRouter = exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_js_1 = require("./db.js");
const passport_1 = __importDefault(require("passport"));
require("./passport.js");
const apiRouter = express_1.default.Router();
exports.apiRouter = apiRouter;
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
// API routes
// get all users
apiRouter.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, db_js_1.getUsers)();
    res.send(users);
}));
// get user by id
apiRouter.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield (0, db_js_1.getUser)(id);
    res.send(user);
}));
// add user
apiRouter.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, year_id, major_id } = req.body;
    const user = yield (0, db_js_1.addUser)(first_name, last_name, year_id, major_id);
    res.status(201).send(user);
}));
// Auth routes
// check if user logged in
const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
};
// authenticate user
authRouter.get("/google", passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
// callback route for google to redirect to
authRouter.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/google/failed" }), (req, res) => {
    // Successful authentication, redirect to success route or respond as needed
    res.redirect("/");
});
authRouter.get("/google/failed", (req, res) => {
    res.send("Login failed");
});
// logout user
authRouter.post("/logout", (req, res) => {
    console.log('Logging out user');
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});
authRouter.get('/user', (req, res) => {
    if (req.user) {
        res.json(req.user); // Return user data
    }
    else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});
