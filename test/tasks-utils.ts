import { TaskServises } from "../src/services/task.services";

export class TaskUtils {
  static create() {
    const task1 = TaskServises.create({
      title: "First Task",
      description: "First Description",
    });
  }
}
