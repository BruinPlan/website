import express from 'express'
import session from 'express-session'
import { apiRouter, authRouter } from './router.js'
import path from 'path'
import { access } from 'fs'
import passport from 'passport'
import './passport.js'

export class Server {
  constructor() {
    this.app = express()
    this.app.use(express.json())

    // enable cors
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })

    this.app.use(session({ secret: 'cats' }))

    // Passport middleware
    this.app.use(passport.initialize())
    this.app.use(passport.session())

    // api
    this.app.use('/api', apiRouter)
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