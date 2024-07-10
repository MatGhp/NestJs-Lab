import { TaskStatus } from '../models/task.model';

export class GetTasksFilterDto {
  status?: TaskStatus;
  title?: string;
  description?: string;
}
