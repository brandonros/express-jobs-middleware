const { queryDatabase } = require('../lib/database')

module.exports = async (req, res) => {
  const sql = 'SELECT * FROM logs WHERE task_id = $taskId'
  const bindings = {
    $taskId: req.params.taskId
  }
  const results = await queryDatabase(sql, bindings)
  return {
    statusCode: 200,
    body: results
  }
}
