const express = require('express')
const { initDatabase } = require('./lib/database')
const wrapRoute = require('./lib/wrap-route.js')

const initServer = () => {
  const app = express()
  // Middleware
  app.use(express.json())
  // Routes
  app.get('/tasks', wrapRoute(require('./routes/get-tasks.js')))
  app.get('/tasks/:taskId', wrapRoute(require('./routes/get-task.js')))
  app.get('/tasks/:taskId/logs', wrapRoute(require('./routes/get-task-logs.js')))
  app.post('/tasks', wrapRoute(require('./routes/create-task.js')))
  app.post('/tasks/:taskId/cancel', wrapRoute(require('./routes/cancel-task.js')))
  app.delete('/tasks/:taskId', wrapRoute(require('./routes/delete-task.js')))
  // Bind
  app.listen(process.env.PORT || 3000,  () => console.log('Listening...'))
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
