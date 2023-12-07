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
  passport.authenticate('google', { 
    successRedirect: '/google/success',
    failureRedirect: '/google/failed' }),
)

authRouter.get("/google/success", isLoggedIn, (req, res) => {
  res.send(req.user)
})

authRouter.get("/google/failed", (req, res) => {
  res.send("Login failed")
})

// logout user
authRouter.get("/logout", (req, res) => {
  req.session = null;  
  req.logout()
  res.send('Logged out')
  res.redirect('/')
})

export { apiRouter, authRouter }