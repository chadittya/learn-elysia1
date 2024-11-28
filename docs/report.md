# PROJECT Simple Task Manager API

## src/index.ts

```ts
import { Elysia, t } from "elysia";
import { TaskServises } from "./services/task.services";
import { taskRequest, taskResponse } from "./models/task.model";
import { TaskSchema } from "./schema/task.schema";

const app = new Elysia()
  .post(
    "/tasks",
    ({ body }) => TaskServises.create(body as taskRequest),
    TaskSchema.create
  )
  .get("/tasks", () => TaskServises.getAll())
  .get("/tasks/:id", ({ params }) =>
    TaskServises.getTaskById(Number(params.id))
  )
  .put(
    "/tasks/:id",
    ({ params, body }) =>
      TaskServises.update(Number(params.id), body as taskResponse),
    TaskSchema.update
  )
  .delete("/tasks/:id", ({ params }) => TaskServises.delete(Number(params.id)))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export default app;
```

## src/ervices/task.services.ts

```ts
import {
  taskRequest,
  taskResponse,
  toTaskResponse,
} from "../models/task.model";

export class TaskServises {
  private static tasks: taskResponse[] = [];
  private static nextId: number = 1;

  static create(request: taskRequest): taskResponse {
    const newTask: taskResponse = {
      id: this.nextId++,
      title: request.title,
      description: request.description,
      complete: false,
    };

    this.tasks.push(newTask);
    return toTaskResponse(newTask);
  }

  static getAll(): { data: taskResponse[] } {
    return {
      data: [...this.tasks],
    };
  }

  static getTaskById(id: number): { data: taskResponse | undefined } {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new Response(
        JSON.stringify({
          error: "Task not found",
        }),
        { status: 404 }
      );
    }
    return { data: toTaskResponse(task) };
  }

  static update(
    id: number,
    request: Partial<taskResponse>
  ): { data: taskResponse | null } {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new Response(
        JSON.stringify({
          error: "Task not found",
        }),
        { status: 404 }
      );
    }

    if (request.hasOwnProperty("complete")) {
      this.tasks[taskIndex].complete = request.complete!;
    }

    return { data: toTaskResponse(this.tasks[taskIndex]) };
  }

  static delete(id: number): { deleted: boolean } {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    // Check if the task exists
    if (taskIndex === -1) {
      throw new Response(
        JSON.stringify({
          error: "Task not found",
        }),
        { status: 404 }
      );
    }

    // Remove the task from the array
    this.tasks.splice(taskIndex, 1);

    // Return the success response
    return { deleted: true };
  }
}
```

## src/models/task.model.ts

```ts
export interface taskRequest {
  title: string;
  description: string;
}

export interface taskResponse {
  id: number;
  title: string;
  description: string;
  complete: boolean;
}

export function toTaskResponse(task: taskResponse): taskResponse {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    complete: task.complete,
  };
}
```

## src/schema/task.schema.ts

```ts
import { t } from "elysia";

export class TaskSchema {
  static create = {
    body: t.Object({
      title: t.String({
        minLength: 1,
        error: { error: "Title cannot be empty" },
      }),
      description: t.String({
        minLength: 1,
        error: { error: "Description cannot be empty" },
      }),
    }),
  };

  static update = {
    body: t.Object({
      complete: t.Boolean({
        error: {
          error: "Varibale cannot be update except complete field",
        },
      }),
    }),
  };
}
```
