import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from '../models/task.model';
import { CreateTaskDto } from '../dtos/createTask.dto';
import { GetTasksFilterDto } from '../dtos/getTasksFilter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      title: 'Write an article',
      description: 'Start writing an article about NestJS',
      status: TaskStatus.OPEN,
      id: 1,
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasks(taskDto: GetTasksFilterDto): Task[] {
    const { status, title, description } = taskDto;

    let tasks = this.tasks;

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (title) {
      tasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(title.toLowerCase()),
      );
    }

    if (description) {
      tasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(description.toLowerCase()),
      );
    }

    return tasks;
  }

  getTaskById(id: number): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }
    return found;
  }

  createTask(createTask: CreateTaskDto): Task {
    const newId = Math.max(...this.tasks.map((task) => task.id)) + 1;
    const newTask: Task = { ...createTask, id: newId };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTaskStatus(id: number, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: number): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }
}
