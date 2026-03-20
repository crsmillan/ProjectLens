export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface Task {
  _id: string;
  name: string;
  status: TaskStatus;
  projectId: string;
  createdAt: string;
  completedAt?: string;
}

export interface Project {
  _id: string;
  name: string;
  description?: string;
}

export interface ProjectMetrics {
  progress: number;
  totalTasks: number;
  completedTasks: number;
  averageCompletionTimeMinutes: number;
}
