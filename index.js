const express = require('express')
const {
  getTasks,
  getTask,
  getTaskLogs,
  createTask,
  cancelTask,
  deleteTask
} = require('./routes')
const { initDatabase } = require('./lib/database')
const wrapRoute = require('./lib/wrap-route')

const run = async () => {
  await initDatabase()

  const app = express()

  app.use(express.json())

  app.get('/tasks', wrapRoute(getTasks))
  app.get('/tasks/:taskId', wrapRoute(getTask))
  app.get('/tasks/:taskId/logs', wrapRoute(getTaskLogs))
  app.post('/tasks', wrapRoute(createTask))
  app.post('/tasks/:taskId/cancel', wrapRoute(cancelTask))
  app.delete('/tasks/:taskId', wrapRoute(deleteTask))

  app.listen(3000,  () => console.log('Listening on port 3000'))
}

run()
.catch((err) => {
  console.error(err)
  process.exit(1)
})
