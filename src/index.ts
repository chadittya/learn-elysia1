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
