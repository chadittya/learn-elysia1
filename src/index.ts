import { Elysia, t } from "elysia";
import { TaskServises } from "./services/task.services";
import { taskRequest } from "./models/task.model";
import { TaskSchema } from "./schema/task.schema";

const app = new Elysia()
  .post(
    "/tasks",
    ({ body }) => TaskServises.create(body as taskRequest),
    TaskSchema.create
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export default app;
