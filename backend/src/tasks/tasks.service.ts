import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './repositories/task.repository';
import { CreateTaskDto } from './dto/task.dto';
import { Task, TaskStatus } from './schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.create(createTaskDto);
  }

  async completeTask(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.taskRepository.update(id, {
      status: TaskStatus.COMPLETED,
      completedAt: new Date(),
    });
  }

  async findByProject(projectId: string): Promise<Task[]> {
    return this.taskRepository.findByProjectId(projectId);
  }
}
