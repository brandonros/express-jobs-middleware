const { queryDatabase } = require('../lib/database.js')
const { killTask } = require('../lib/tasks.js')

const getTask = async (taskId) => {
  const sql = 'SELECT pid FROM tasks WHERE task_id = $taskId'
  const bindings = {
    $taskId: taskId
  }
  const [task] = await queryDatabase(sql, bindings)
  if (!task) {
    throw new Error('Task not found')
  }
  return task
}

module.exports = async (req, res) => {
  const task = await getTask(req.params.taskId)
  killTask(task.pid)
  return {
    statusCode: 200,
    body: {
      success: true
    }
  }
}
