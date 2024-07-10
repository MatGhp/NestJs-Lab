import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.model';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter.dto';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task-dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasks(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id', ParseUUIDPipe) id: number): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTask(@Body() createTask: CreateTaskDto): Task {
    return this.tasksService.createTask(createTask);
  }

  @Put(':id/status')
  updateTaskStatus(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.tasksService.updateTaskStatus(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTask(@Param('id', ParseUUIDPipe) id: number): void {
    this.tasksService.deleteTask(id);
  }
}
