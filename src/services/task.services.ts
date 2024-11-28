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
}
