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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const db_js_1 = require("./db.js");
// import User from './models/user.js';
// Configure Passport strategies
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://127.0.0.1:3000/auth/google/callback`,
    scope: ['profile', 'email'],
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Authenticating user');
    try {
        const user = yield (0, db_js_1.getUser)(profile.id);
        // If previously logged in, fetch user
        if (user) {
            console.log(`User ${user.google_id} found`);
            return done(null, user);
        }
        // If new user, create new user
        const newUser = yield (0, db_js_1.addUser)(profile.name.givenName, profile.name.familyName, 1, 1, profile.id);
        console.log(`User ${newUser.google_id} created`);
        return done(null, newUser);
    }
    catch (err) {
        console.log(err);
        return done(err, null);
    }
})));
// Serialize and deserialize user
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
