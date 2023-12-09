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
// Configure Passport strategies
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://127.0.0.1:3000/auth/google/callback`,
    scope: ['profile', 'email'],
}, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Authenticating user');
    try {
        console.log(profile);
        const user = yield (0, db_js_1.getUser)(profile.id);
        // If new user, create new user
        if (!user) {
            const newUser = yield (0, db_js_1.addUser)(profile.name.givenName, profile.name.familyName, 1, 1, profile.id);
            console.log(`User ${profile.id} created`);
            return cb(null, newUser);
        }
        // If previously logged in, fetch user
        console.log(`User ${profile.id} found`);
        return cb(null, user); // Returns user, accessible by req.session.passport.user
    }
    catch (err) {
        console.log(err);
        return cb(err, null);
    }
})));
// Serialize user by google_id
passport_1.default.serializeUser((user, done) => {
    done(null, user.google_id);
});
// Deserialize user by google_id
passport_1.default.deserializeUser((google_id, done) => {
    (0, db_js_1.getUser)(google_id).then(user => done(null, user));
});
