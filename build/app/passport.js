"use strict";
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
}, (accessToken, refreshToken, profile, done) => {
    console.log('Attempting to authenticate user test');
    console.log(profile.id);
    return done(null, profile);
    // try {
    //   const user = getUser(profile.id)
    //   if (user) {
    //     return done(null, profile)
    //   }
    //     addUser(profile.name.givenName, profile.name.familyName, 1, 1)
    //     return done(null, profile)
    // } catch (err) {
    //   console.log(err)
    //   return done(err, null)
    // }
}));
// Serialize and deserialize user
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
