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
