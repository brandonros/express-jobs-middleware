# express-tasks

node.js Express wrapper around basic CRUD operations for long-lived tasks/scripts/processes

## Usage

1. Clone repository
1. `npm install`
1. Configure `scripts/run-task.js` to your liking
1. `npm run start`
1. Interact with API on port `3000`

## API

### `POST /tasks`

```json
{
  "taskId": "uuid",
  "input": {
    "foo": "bar"
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
