import express from 'express'
import { getUsers, getUser, addUser , getCourses, getScheduleEntries, addScheduleEntry, updateScheduleEntry } from './db.js'
import passport from 'passport'

const router = express.Router()
const authRouter = express.Router()

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

// delete schedule entry
router.post("/schedule-entries/update", async (req, res) => {
    const { id, quarter } = req.body
    const result = await updateScheduleEntry(id, quarter)
    res.status(200).send(result)
})

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
    res.redirect("/");
  }
);

authRouter.get("/failure", (req, res) => {
  res.send("Login failed")
})

// logout user
authRouter.get("/logout", (req, res) => {
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

export { router, authRouter }