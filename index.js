const express = require('express')
const { initDatabase } = require('./lib/database')
const wrapRoute = require('./lib/wrap-route')

const initServer = () => {
  const app = express()

  // Middleware
  app.use(express.json())

  // Routes
  app.get('/tasks', wrapRoute(require('./routes/getTasks')))
  app.get('/tasks/:taskId', wrapRoute(require('./routes/getTask')))
  app.get('/tasks/:taskId/logs', wrapRoute(require('./routes/getTaskLogs')))
  app.post('/tasks', wrapRoute(require('./routes/createTask')))
  app.post('/tasks/:taskId/cancel', wrapRoute(require('./routes/cancelTask')))
  app.delete('/tasks/:taskId', wrapRoute(require('./routes/deleteTask')))

  app.listen(3000,  () => console.log('Listening on port 3000'))
}

const run = async () => {
  await initDatabase()
  initServer()
}

run()
.catch((err) => {
  console.error(err)
  process.exit(1)
})
