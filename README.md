# Simple Task Manager API

The **Simple Task Manager API** is built using the [Elysia.js](https://elysiajs.com/) framework. This API allows users to create, retrieve, update, and delete tasks in a simple task management system.

## Features

- **Create Tasks**: Add new tasks with a title and description.
- **Retrieve Tasks**:
  - Fetch all tasks.
  - Fetch a specific task by its ID.
- **Update Tasks**: Update a task's `complete` status.
- **Delete Tasks**: Remove tasks by their ID.

## Project Structure

```
src/
├── index.ts             # Entry point of the application
├── services/
│   └── task.services.ts # Task services for business logic
├── models/
│   └── task.model.ts    # Task request/response models
└── schema/
    └── task.schema.ts   # Validation schemas for tasks
```

## API Endpoints

### Base URL: `http://localhost:3000`

### POST `/tasks`

- **Description**: Create a new task.
- **Request Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Task Description"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Task Title",
    "description": "Task Description",
    "complete": false
  }
  ```

### GET `/tasks`

- **Description**: Retrieve all tasks.
- **Response**:
  ```json
  {
    "data": [
      {
        "id": 1,
        "title": "Task Title",
        "description": "Task Description",
        "complete": false
      }
    ]
  }
  ```

### GET `/tasks/:id`

- **Description**: Retrieve a task by its ID.
- **Response**:
  ```json
  {
    "data": {
      "id": 1,
      "title": "Task Title",
      "description": "Task Description",
      "complete": false
    }
  }
  ```

### PUT `/tasks/:id`

- **Description**: Update a task's `complete` status.
- **Request Body**:
  ```json
  {
    "complete": true
  }
  ```
- **Response**:
  ```json
  {
    "data": {
      "id": 1,
      "title": "Task Title",
      "description": "Task Description",
      "complete": true
    }
  }
  ```

### DELETE `/tasks/:id`

- **Description**: Delete a task by its ID.
- **Response**:
  ```json
  {
    "deleted": true
  }
  ```

## Installation and Usage

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Bun](https://bun.sh/) or another JavaScript runtime

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd simple-task-manager-api
   ```
3. Install dependencies:
   ```bash
   bun install
   ```
4. Start the server:
   ```bash
   bun run src/index.ts
   ```
5. Open your browser or API client and access `http://localhost:3000`.

## Validation Rules

Validation is handled using `Elysia`'s built-in `t` module:

- **Task Creation**:
  - `title` and `description` must be non-empty strings.
- **Task Update**:
  - Only the `complete` field can be updated.

## Error Handling

The API returns appropriate error messages and status codes for:

- Invalid input validation.
- Resource not found (404).
- Internal server errors.

---

**Happy coding!**
