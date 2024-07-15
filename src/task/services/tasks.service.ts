import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from '../dtos/update-task-dto';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter.dto';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { Task } from '../entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { TaskStatus } from '../models/task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @Inject(getRepositoryToken(Task))
    private taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, title, description } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');

    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (title) {
      query.andWhere('LOWER(task.title) LIKE LOWER(:title)', {
        title: `%${title}%`,
      });
    }

    if (description) {
      query.andWhere('LOWER(task.description) LIKE LOWER(:description)', {
        description: `%${description}%`,
      });
    }

    return await query.getMany();
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    return await this.taskRepository.save(task);
  }

  async updateTaskStatus(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    Object.assign(task, updateTaskDto);
    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }
  }
}
