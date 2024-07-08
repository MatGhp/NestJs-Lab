import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TasksController } from './task/controllers/tasks/tasks.controller';

@Module({
  imports: [TaskModule],
  controllers: [TasksController],
  providers: [TaskModule],
})
export class AppModule {}
