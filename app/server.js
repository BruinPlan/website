import express from 'express'
import session from 'express-session'
import { router, authRouter } from './router.js'
import path from 'path'
import passport from 'passport'
import cors from 'cors'
import MySQLStore from 'express-mysql-session'

import './passport.js'

export class Server {
  constructor() {
    this.app = express()
    this.app.use(express.json())

    const corsOptions = {
      optionsSuccessStatus: 200,
      credentials: true,
    }
    this.app.use(cors(corsOptions))

    // enable cors
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })
    
    // session middleware
    this.app.use(session({
        // key: 'session_cookie_name',
        secret: 'session_cookie_secret',
        // store: new MySQLStore({
        //   host: process.env.DB_HOST,
        //   port: process.env.PORT,
        //   user: process.env.DB_USER,
        //   password: process.env.DB_PASS,
        //   database: 'sessions',
        // }),
        resave: false, // Set to false to avoid unnecessary session saves
        saveUninitialized: false, // Set to false to avoid storing uninitialized sessions
        cookie: {
          httpOnly: true,
          maxAge: 1000 * 60 * 60}, // 1 hour
      })
    );

    // Passport middleware
    this.app.use(passport.initialize())
    this.app.use(passport.session())

    // this.app.use(cors({ origin: 'http://127.0.0.1:3000', methods: "GET,POST,PUT,DELETE", credentials: true }))

    // api
    this.app.use('/api', router)
    this.app.use('/auth', authRouter)

    // handle errors
    this.app.use((err, req, res, next) => {
      console.log(err.stack)
      res.status(500).send('Something broke!')
    })

    // load frontend
    const frontendPath = path.resolve("./") + "/build/frontend"

    this.app.use(express.static(frontendPath))

    this.app.get('*', (req, res) => {
      res.sendFile(path.join(frontendPath, '/index.html'))
    })

  }

  // start server
  start(domain, port) {
    this.app.listen(port, domain, () => {
      console.log(`Server is listening at http://${domain}:${port}`)
    })
  }
}