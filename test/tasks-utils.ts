import { taskResponse } from "../src/models/task.model";
import { TaskServises } from "../src/services/task.services";

export class TaskUtils {
  static create(): taskResponse[] {
    const task1 = TaskServises.create({
      title: "First Task",
      description: "First Description",
    });

    return [task1];
  }
  static createSecond() {
    const task1 = TaskServises.create({
      title: "Second Task",
      description: "Second Description",
    });
  }

  static reset(): void {
    // Directly reset the TaskServises static storage
    (TaskServises as any)["tasks"] = [];
    (TaskServises as any)["nextId"] = 1;
  }
}
