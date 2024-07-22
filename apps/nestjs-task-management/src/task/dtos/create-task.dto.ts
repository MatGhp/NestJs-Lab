import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../models/task-status.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  status: TaskStatus;

  @IsNotEmpty()
  title: string;

  description: string;
}
