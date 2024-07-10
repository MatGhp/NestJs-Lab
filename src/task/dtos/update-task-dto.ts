import { TaskStatus } from '../models/task.model';
import { IsEnum } from 'class-validator';

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;

  title?: string;
  description?: string;
}
