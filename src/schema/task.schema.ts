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
}
