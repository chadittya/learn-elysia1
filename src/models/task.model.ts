export interface taskRequest {
  title: string;
  description: string;
}

export interface taskResponse {
  id: number;
  title: string;
  description: string;
  complete: boolean;
}

export function toTaskResponse(task: taskResponse): taskResponse {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    complete: task.complete,
  };
}
