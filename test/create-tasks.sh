#!/bin/sh
PAYLOAD=$(cat <<EOF
{
  "name": "search-logs",
  "input": {
    "pattern": "./logs/**/*.log",
    "filters": [],
    "sortKey": "timestamp",
    "sortDirection": "asc",
    "offset": 0,
    "limit": 500
  }
}
EOF
)
RESPONSE=$(curl \
  -X POST \
  -H 'Content-Type: application/json' \
  -d "$PAYLOAD" \
  http://localhost:3000/tasks)
TASK_ID=$(echo $RESPONSE | jq -r .taskId)
curl http://localhost:3000/tasks/$TASK_ID
curl http://localhost:3000/tasks/$TASK_ID/logs
