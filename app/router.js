import express from 'express'
import { getUsers, getUser, addUser } from './db.js'
import passport from 'passport'
import './passport.js'

const apiRouter = express.Router()
const authRouter = express.Router()

// API routes

// get all users
apiRouter.get("/users", async (req, res) => {
  const users = await getUsers()
  res.send(users)
})

// get user by id
apiRouter.get("/users/:id", async(req, res) => {
  const id = req.params.id
  const user = await getUser(id)
  res.send(user)
})

// add user
apiRouter.post("/users", async (req, res) => {
  const { first_name, last_name, year_id, major_id } = req.body
  const user = await addUser(first_name, last_name, year_id, major_id)
  res.status(201).send(user)
})


// Auth routes

// check if user logged in
const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401)
}

// authenticate user
authRouter.get("/google", 
  passport.authenticate('google', { scope: ['profile', 'email'] }))

// callback route for google to redirect to
authRouter.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log(req.user)
    res.redirect("/");
  }
);

authRouter.get("/failure", (req, res) => {
  console.log(req.user)
  console.log("Login failed")
  res.send("Login failed")
})

// logout user
authRouter.get("/logout", (req, res) => {
  console.log('Logging out user')
  req.logout(function(err) {
    if (err) { return next(err) }
    res.redirect('/');
  });
})

authRouter.get('/user', (req, res) => {
  if (req.user) {
    res.json(req.user); // Return user data
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

export { apiRouter, authRouter }