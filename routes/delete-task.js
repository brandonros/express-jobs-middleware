const { queryDatabase } = require('../lib/database.js')

module.exports = async (req, res) => {
  const sql = 'DELETE from tasks WHERE task_id = $taskId'
  const bindings = {
    $taskId: req.params.taskId
  }
  await queryDatabase(sql, bindings)
  return {
    statusCode: 200,
    body: {
      success: true
    }
  }
}
