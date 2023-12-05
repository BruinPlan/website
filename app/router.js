import express from 'express'
import { getUsers, getUser, addUser } from './db.js'

const router = express.Router()

// get all users
router.get("/users", async (req, res) => {
  const users = await getUsers()
  res.send(users)
})

// get user by id
router.get("/users/:id", async(req, res) => {
  const id = req.params.id
  const user = await getUser(id)
  res.send(user)
})

// add user
router.post("/users", async (req, res) => {
  const { first_name, last_name, year_id, major_id } = req.body
  const user = await addUser(first_name, last_name, year_id, major_id)
  res.status(201).send(user)
})

export default router