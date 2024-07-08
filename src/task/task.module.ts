import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks/tasks.controller';

@Module({
  controllers: [TasksController],
})
export class TaskModule {}
