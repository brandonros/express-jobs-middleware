# express-tasks

Wrapper around basic CRUD operations for long-lived jobs/tasks/scripts/processes

## Technologies used

* node.js
* sqlite3
* express
* execa

## Usage

1. Clone repository
1. `npm install`
1. Configure `scripts/task-name.js` to your liking
1. `npm run start`
1. Interact with API on port `3000`

## API

### `POST /tasks`

```json
{
  "name": "search-logs",
  "input": {
    "pattern": "/tmp/logs/**/*.log",
    "filters": [],
    "sortKey": "timestamp",
    "sortDirection": "asc",
    "offset": 0,
    "limit": 500
  }
}
```

### `GET /tasks`

### `GET /tasks/:taskId`

### `GET /tasks/:taskId/logs`

### `POST /tasks/:taskId/cancel`

```json
{
  "signal": "SIGTERM"
}
```

### `DELETE /tasks/:taskId`
