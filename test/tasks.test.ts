import { beforeEach, describe, expect, it } from "bun:test";
import app from "../src";
import { TaskUtils } from "./tasks-utils";

describe("POST /tasks", () => {
  it("should create new task", async () => {
    const response = await app.handle(
      new Request("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "test",
          description: "test",
        }),
      })
    );

    // console.log(response);
    expect(response.status).toBe(200);

    const body = await response.json();
    // console.log(body);
    expect(body).toBeDefined();
    expect(body.title).toBe("test");
    expect(body.description).toBe("test");
  });

  it("should reject when invalid request (blank title)", async () => {
    const response = await app.handle(
      new Request("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "",
          description: "test",
        }),
      })
    );

    // console.log(response);
    expect(response.status).toBe(422);

    const body = await response.json();
    // console.log(body);
    expect(body.error).toBeDefined();
  });

  it("should reject when invalid request (blank description)", async () => {
    const response = await app.handle(
      new Request("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "test",
          description: "",
        }),
      })
    );

    // console.log(response);
    expect(response.status).toBe(422);

    const body = await response.json();
    // console.log(body);
    expect(body.error).toBeDefined();
  });

  it("should reject when invalid request (all blank)", async () => {
    const response = await app.handle(
      new Request("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "",
          description: "",
        }),
      })
    );

    // console.log(response);
    expect(response.status).toBe(422);

    const body = await response.json();
    // console.log(body);
    expect(body.error).toBeDefined();
  });
});

describe("GET /tasks", () => {
  beforeEach(() => {
    TaskUtils.reset();
  });
  it("should return an empty array when no tasks exist", async () => {
    const response = await app.handle(
      new Request("http://localhost:3000/tasks", {
        method: "GET",
      })
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    // console.log(response);
    // console.log(body);

    expect(body.data).toEqual([]);
  });

  it("should be return all tasks", async () => {
    TaskUtils.create();
    TaskUtils.createSecond();

    const response = await app.handle(
      new Request("http://localhost:3000/tasks", {
        method: "GET",
      })
    );

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data).toBeArray();
    expect(body.data.length).toBeGreaterThanOrEqual(1);
  });
});

describe("GET /tasks/:id", () => {
  beforeEach(() => {
    TaskUtils.reset();
  });
  it("should get single task by id", async () => {
    const tasks = TaskUtils.create();
    const getTask = tasks[0];

    const response = await app.handle(
      new Request(`http://localhost:3000/tasks/${getTask?.id}`, {
        method: "GET",
      })
    );

    expect(response.status).toBe(200);

    const body = await response.json();
    // console.log(response);
    // console.log(body);
    expect(body.data).toBeDefined();
    expect(body.data.id).toBeDefined();
    expect(body.data.title).toBeDefined();
    expect(body.data.description).toBeDefined();
    expect(body.data.complete).toBeDefined();
  });

  it("should not get task if id not available", async () => {
    const tasks = TaskUtils.create();
    const getTask = tasks[0];

    const response = await app.handle(
      new Request(`http://localhost:3000/tasks/1234`, {
        method: "GET",
      })
    );

    expect(response.status).toBe(404);

    const body = await response.json();
    // console.log(response);
    // console.log(body);
    expect(body.error).toBeDefined();
  });
});

describe("PUT /tasks/:id", () => {
  beforeEach(() => {
    TaskUtils.reset();
  });
  it("should be update complete", async () => {
    const tasks = TaskUtils.create();
    const getTask = tasks[0];

    const response = await app.handle(
      new Request(`http://localhost:3000/tasks/${getTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          complete: true,
        }),
      })
    );

    expect(response.status).toBe(200);

    const body1 = await response.json();
    // console.log(response);
    // console.log(body1);
    expect(body1.data).toBeDefined();
    expect(body1.data.complete).toBe(true);

    const response2 = await app.handle(
      new Request(`http://localhost:3000/tasks/${getTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          complete: false,
        }),
      })
    );

    expect(response2.status).toBe(200);

    const body2 = await response2.json();
    // console.log(response2);
    // console.log(body2);
    expect(body2.data).toBeDefined();
    expect(body2.data.complete).toBe(false);
  });

  it("should not update other than complete field (update title)", async () => {
    const tasks = TaskUtils.create();
    const getTask = tasks[0];

    const response = await app.handle(
      new Request(`http://localhost:3000/tasks/${getTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "updated",
        }),
      })
    );

    expect(response.status).toBe(422);

    const body = await response.json();
    // console.log(response);
    // console.log(body);
    expect(body.error).toBeDefined();
  });
});

describe("DELETE /tasks/:id", () => {
  beforeEach(() => {
    TaskUtils.reset();
  });

  it("should be delete tasks", async () => {
    const tasks = TaskUtils.create();
    const getTask = tasks[0];

    const response = await app.handle(
      new Request(`http://localhost:3000/tasks/${getTask.id}`, {
        method: "DELETE",
      })
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    // console.log(response);
    // console.log(body);
    expect(body.deleted).toBeDefined();
  });

  it("should be delete tasks if id not available", async () => {
    const tasks = TaskUtils.create();
    const getTask = tasks[0];

    const response = await app.handle(
      new Request(`http://localhost:3000/tasks/99999`, {
        method: "DELETE",
      })
    );

    expect(response.status).toBe(404);
    const body = await response.json();
    // console.log(response);
    // console.log(body);
    expect(body.error).toBeDefined();
  });
});
