import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { getUser, addUser } from './db.js'

// Configure Passport strategies
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `http://127.0.0.1:3000/auth/google/callback`,
  scope: ['profile', 'email'],
},
async (accessToken, refreshToken, profile, cb) => {
  try {
    const user = await getUser(profile.id)
    
    // If new user, create new user
    if (!user) {
      const newUser = await addUser(profile.name.givenName, profile.name.familyName, 1, 1, profile.id)
      return cb(null, newUser)
    }

    // If previously logged in, fetch user
    return cb(null, user) // Returns user, accessible by req.session.passport.user
  
  } catch (err) {
    console.log(err)
    return cb(err, null)
  }
}));

// Serialize user by google_id
passport.serializeUser((user, done) => {
  done(null, user.google_id)
});

// Deserialize user by google_id
passport.deserializeUser((google_id, done) => {
  getUser(google_id).then(user => done(null, user))
});