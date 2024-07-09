export interface Task {
  description: string;

  id: number;

  status: TaskStatus;

  title: string;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
