const execa = require('execa')
const { queryDatabase } = require('./database.js')

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

const markTaskExited = (taskId, exitCode, signal) => {
  const sql = `UPDATE tasks SET status = $status, exit_code = $exitCode, signal = $signal WHERE task_id = $taskId`
  const bindings = {
    $status: 'finished',
    $exitCode: exitCode,
    $signal: signal,
    $taskId: taskId
  }
  return queryDatabase(sql, bindings)
}

const spawnTask = (taskId, name, input) => {
  const instance = execa('node', [`scripts/${name}.js`, `${JSON.stringify(input)}`], { detached: true })
  instances[instance.pid] = instance
  instance.stdout.on('data', (data) => {
    writeLogs('stdout', taskId, data.toString(), new Date().toISOString())
    .catch((err) => {
      throw err
    })
  })
  instance.stderr.on('data', (data) => {
    writeLogs('stderr', taskId, data.toString(), new Date().toISOString())
    .catch((err) => {
      throw err
    })
  })
  instance.on('exit', (code, signal) => {
    markTaskExited(taskId, code, signal)
    .catch((err) => {
      throw err
    })
  })
  return instance.pid
}

const killTask = async (pid) => {
  instances[pid].kill('SIGTERM')
}

module.exports = {
  spawnTask,
  killTask
}
