import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter.dto';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task-dto';
import { Task } from '../entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../auth/entities/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User ${user.username} is looking for ${JSON.stringify(filterDto)}`,
    );
    if (Object.keys(filterDto).length) {
      return await this.tasksService.getTasks(filterDto, user);
    }
    return this.tasksService.getAllTasks(user);
  }

  @Get(':id')
  async getTaskById(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(
    @Body() createTask: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTask, user);
  }

  @Put(':id/status')
  async updateTaskStatus(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.updateTaskStatus(id, updateTaskDto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<void> {
    await this.tasksService.deleteTask(id, user);
  }
}
