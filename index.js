const express = require('express')
const {
  getTasks,
  getTask,
  createTask,
  cancelTask,
  deleteTask
} = require('./routes')

const app = express()

app.use(express.json())

app.get('/tasks', getTasks)
app.get('/tasks/:taskId', getTask)
app.post('/tasks', createTask)
app.post('/tasks/:taskId/cancel', cancelTask)
app.delete('/tasks/:taskId', deleteTask)

app.listen(3000,  () => console.log('Listening on port 3000'))
