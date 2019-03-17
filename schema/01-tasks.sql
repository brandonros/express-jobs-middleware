CREATE TABLE tasks(
  task_id TEXT PRIMARY KEY,
  status TEXT NOT NULL,
  input TEXT NOT NULL,
  pid TEXT NOT NULL,
  stdout TEXT,
  stderr TEXT,
  output TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  started_at TIMESTAMP,
  finished_at TIMESTAMP
);
