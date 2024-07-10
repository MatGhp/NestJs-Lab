import { TaskStatus } from '../models/task.model';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  status: TaskStatus;

  @IsNotEmpty()
  title: string;

  description: string;
}
