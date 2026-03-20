import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './projects.service';
import { ProjectRepository } from './repositories/project.repository';
import { TaskRepository } from '../tasks/repositories/task.repository';
import { TaskStatus } from '../tasks/schemas/task.schema';
import { NotFoundException } from '@nestjs/common';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';

describe('ProjectService', () => {
  let service: ProjectService;
  let projectRepo: ProjectRepository;
  let taskRepo: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: ProjectRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: TaskRepository,
          useValue: {
            findByProjectId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    projectRepo = module.get<ProjectRepository>(ProjectRepository);
    taskRepo = module.get<TaskRepository>(TaskRepository);
  });

  it('should calculate metrics correctly', async () => {
    const projectId = 'proj123';
    const project = { _id: projectId, name: 'Test Project' } as any;
    const tasks = [
      {
        status: TaskStatus.COMPLETED,
        createdAt: new Date('2024-01-01T10:00:00Z'),
        completedAt: new Date('2024-01-01T11:00:00Z'),
      },
      {
        status: TaskStatus.PENDING,
        createdAt: new Date('2024-01-01T10:00:00Z'),
      },
    ] as any[];

    jest.spyOn(projectRepo, 'findById').mockResolvedValue(project);
    jest.spyOn(taskRepo, 'findByProjectId').mockResolvedValue(tasks);

    const metrics = await service.getMetrics(projectId);

    expect(metrics.progress).toBe(50);
    expect(metrics.totalTasks).toBe(2);
    expect(metrics.completedTasks).toBe(1);
    expect(metrics.averageCompletionTimeMinutes).toBe(60);
  });

  it('should handle zero tasks correctly', async () => {
    const projectId = 'proj123';
    const project = { _id: projectId, name: 'Empty Project' } as any;

    jest.spyOn(projectRepo, 'findById').mockResolvedValue(project);
    jest.spyOn(taskRepo, 'findByProjectId').mockResolvedValue([]);

    const metrics = await service.getMetrics(projectId);

    expect(metrics.progress).toBe(0);
    expect(metrics.averageCompletionTimeMinutes).toBe(0);
    expect(metrics.totalTasks).toBe(0);
  });
});
