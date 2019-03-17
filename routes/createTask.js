const { queryDatabase } = require('../lib/database')
const { spawnTask } = require('../lib/tasks')

module.exports = async (req, res) => {
  const pid = spawnTask(req.body)
  const sql = 'INSERT INTO tasks (task_id, status, pid, input) VALUES ($taskId, $status, $pid, $input)'
  const bindings = {
    $taskId: req.body.taskId,
    $status: 'running',
    $input: JSON.stringify(req.body.input),
    $pid: pid
  }
  await queryDatabase(sql, bindings)
  return {
    statusCode: 200,
    body: {
      success: true
    }
  }
}
