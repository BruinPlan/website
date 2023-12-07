import express from 'express'
import { getUsers, getUser, addUser , getCourses, getScheduleEntries, addScheduleEntry } from './db.js'

const router = express.Router()

/* =============== users =============== */

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

/*  =============== courses  =============== */

// get all courses
router.get("/courses", async (req, res) => {
    const courses = await getCourses()
    res.send(courses)
})

/*  =============== schedule entries =============== */

// get schedule entries by user id
router.get("/schedule-entries/:user_id", async(req, res) => {
    const user_id = req.params.user_id
    const user = await getScheduleEntries(user_id)
    res.send(user)
  })

// add schedule entry
router.post("/schedule-entries", async (req, res) => {
    const { user_id, course_id, year_name, quarter_name } = req.body
    const schedule_entry = await addScheduleEntry(user_id, course_id, year_name, quarter_name)
    res.status(201).send(schedule_entry)
})

export default router