# TASK SPEC API

## CREATE TASK

Endpoint: POST /tasks

Request:

```json
{
  "title": "Complete Elysia Project",
  "description": "Finish the task manager API"
}
```

Response:

```json
{
  "id": "abc123",
  "title": "Complete Elysia Project",
  "description": "Finish the task manager API",
  "completed": false
}
```

## GET TASKS

Endpoint: GET /tasks

Response:

```json
{
  "id": "abc123",
  "title": "Complete Elysia Project",
  "description": "Finish the task manager API",
  "completed": false
},
{
  "id": "abc124",
  "title": "Complete Elysia Project",
  "description": "Finish the task manager API",
  "completed": false
}
```

## GET TASK

Endpoint: GET /tasks/:id

Response:

```json
{
  "id": "abc123",
  "title": "Complete Elysia Project",
  "description": "Finish the task manager API",
  "completed": false
}
```

## UPDATE TASK

Endpoint: PUT /tasks:id

Request:

```json
{
  "title": "Complete Elysia Tutorial",
  "completed": true
}
```

Response:

```json
{
  "id": "abc123",
  "title": "Complete Elysia Project",
  "description": "Finish the task manager API",
  "completed": true
}
```

## DELETE TASK

Endpoint: DELETE /tasks:id

Response:

```json
{
  "message": "Task deleted successfully"
}
```
