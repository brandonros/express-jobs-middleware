CREATE TABLE IF NOT EXISTS tasks(
  task_id TEXT PRIMARY KEY,
  status TEXT NOT NULL,
  name TEXT NOT NULL,
  input TEXT NOT NULL,
  pid TEXT NOT NULL,
  exit_code NUMERIC,
  signal TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  started_at TIMESTAMP,
  finished_at TIMESTAMP
);
