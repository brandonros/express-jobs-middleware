CREATE TABLE IF NOT EXISTS logs(
  task_id TEXT,
  type TEXT,
  message TEXT,
  created_at DATETIME,

  FOREIGN KEY (task_id) REFERENCES tasks (task_id)
);
