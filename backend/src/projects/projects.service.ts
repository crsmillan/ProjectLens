import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './repositories/project.repository';
import { TaskRepository } from '../tasks/repositories/task.repository';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './schemas/project.schema';
import { TaskStatus } from '../tasks/schemas/task.schema';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectRepository.create(createProjectDto);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async getMetrics(projectId: string) {
    const project = await this.findOne(projectId);
    const tasks = await this.taskRepository.findByProjectId(projectId);

    if (tasks.length === 0) {
      return {
        projectName: project.name,
        progress: 0,
        averageCompletionTimeMinutes: 0,
        totalTasks: 0,
        completedTasks: 0,
      };
    }

    const completedTasks = tasks.filter(
      (t) => t.status === TaskStatus.COMPLETED,
    );
    const totalTasksCount = tasks.length;
    const completedTasksCount = completedTasks.length;

    const progress = (completedTasksCount / totalTasksCount) * 100;

    let totalCompletionTimeMs = 0;
    completedTasks.forEach((task) => {
      if (task.completedAt) {
        totalCompletionTimeMs +=
          task.completedAt.getTime() - task.createdAt.getTime();
      }
    });

    const averageCompletionTimeMinutes =
      completedTasksCount > 0
        ? totalCompletionTimeMs / completedTasksCount / (1000 * 60)
        : 0;

    return {
      projectName: project.name,
      progress,
      averageCompletionTimeMinutes,
      totalTasks: totalTasksCount,
      completedTasks: completedTasksCount,
    };
  }
}
