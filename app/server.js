import express from 'express'
import apiRouter from './router.js'
import path from 'path'


export class Server {
  constructor(app) {
    this.app = express()
    this.app.use(express.json())

    // enable cors
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })

    // api
    this.app.use('/api', apiRouter);

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