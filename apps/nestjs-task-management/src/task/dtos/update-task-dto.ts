import { IsEnum } from 'class-validator';
import { TaskStatus } from '../models/task-status.enum';

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;

  title?: string;
  description?: string;
}
