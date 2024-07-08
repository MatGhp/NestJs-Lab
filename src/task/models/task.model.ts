export interface Task {
  readonly description: string;

  readonly id: string;

  status: TaskStatus;

  readonly title: string;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
