const { queryDatabase } = require('../lib/database.js')

module.exports = async (req, res) => {
  const sql = `SELECT task_id,
                      status,
                      name,
                      input,
                      pid,
                      exit_code,
                      signal,
                      created_at,
                      started_at,
                      finished_at
                FROM tasks
                WHERE task_id = $taskId`
  const bindings = {
    $taskId: req.params.taskId
  }
  const [task] = await queryDatabase(sql, bindings)
  if (!task) {
    throw new Error('Task not found')
  }
  return {
    statusCode: 200,
    body: task
  }
}
