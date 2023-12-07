import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { getUser, addUser } from './db.js'

// import User from './models/user.js';

// Configure Passport strategies
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `http://127.0.0.1:3000/auth/google/callback`,
  scope: ['profile', 'email'],
},
async (accessToken, refreshToken, profile, done) => {
  console.log('Attempting to authenticate user')
  try {
    const user = await getUser(profile.id)
    if (user) {
      return done(null, user)
    }
      const newUser = await addUser(profile.name.givenName, profile.name.familyName, 1, 1, profile.id)
      return done(null, newUser)
  } catch (err) {
    console.log(err)
    return done(err, null)
  }
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});