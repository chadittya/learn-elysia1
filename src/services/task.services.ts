import {
  taskRequest,
  taskResponse,
  toTaskResponse,
} from "../models/task.model";
import { TaskSchema } from "../schema/task.schema";

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
    return { data: task };
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

    return { data: this.tasks[taskIndex] };
  }
}
