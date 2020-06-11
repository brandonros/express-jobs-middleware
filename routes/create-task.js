const uuid = require('uuid')
const { queryDatabase } = require('../lib/database.js')
const { spawnTask } = require('../lib/tasks.js')

module.exports = async (req, res) => {
  const taskId = uuid.v4()
  const { input, name } = req.body
  const pid = spawnTask(taskId, name, input)
  const sql = 'INSERT INTO tasks (task_id, status, pid, name, input) VALUES ($taskId, $status, $pid, $name, $input)'
  const bindings = {
    $taskId: taskId,
    $status: 'running',
    $name: name,
    $input: JSON.stringify(input),
    $pid: pid
  }
  await queryDatabase(sql, bindings)
  return {
    statusCode: 200,
    body: {
      taskId
    }
  }
}
