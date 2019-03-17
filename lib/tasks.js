const execa = require('execa')
const { queryDatabase } = require('./database')

const instances = {}

const writeLogs = (type, taskId, message, createdAt) => {
  const sql = 'INSERT INTO logs (task_id, type, message, created_at) VALUES ($taskId, $type, $message, $createdAt)'
  const bindings = {
    $taskId: taskId, 
    $type: type,
    $message: message,
    $createdAt: createdAt
  }
  return queryDatabase(sql, bindings)
}

const spawnTask = ({ taskId, input }) => {
  const command = 'echo'
  const args = ['Hello world!']
  const instance = execa(command, args)
  instance[instance.pid] = instance
  instance.stdout.on('data', (data) => {
    writeLogs('stdout', taskId, data.toString(), new Date().toISOString())
  })
  instance.stderr.on('data', (data) => {
    writeLogs('stderr', taskId, data.toString(), new Date().toISOString())
  })
  return instance.pid
}

const killTask = async () => {

}

module.exports = {
  spawnTask,
  killTask
}
