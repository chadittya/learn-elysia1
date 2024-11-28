import { describe, expect, it } from "bun:test";
import app from "../src";

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
  it("should return an empty array when no tasks exist", async () => {
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
  });
});
