import { create } from 'zustand';
import { Project, ProjectMetrics, Task } from '../types';
import { projectService, taskService } from '../services/api';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  currentMetrics: ProjectMetrics | null;
  currentTasks: Task[];
  loading: boolean;
  error: string | null;
  isSidebarCollapsed: boolean;

  fetchProjects: () => Promise<void>;
  fetchProjectData: (id: string) => Promise<void>;
  selectProject: (project: Project) => Promise<void>;
  createProject: (name: string, description?: string) => Promise<void>;
  createTask: (projectId: string, name: string) => Promise<void>;
  completeTask: (taskId: string) => Promise<void>;
  toggleSidebar: () => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  currentMetrics: null,
  currentTasks: [],
  loading: false,
  error: null,
  isSidebarCollapsed: false,

  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const response = await projectService.getAll();
      set({ projects: response.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchProjectData: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const [projectRes, tasksRes, metricsRes] = await Promise.all([
        projectService.getById(id),
        taskService.getByProject(id),
        projectService.getMetrics(id),
      ]);
      set({ 
        currentProject: projectRes.data,
        currentTasks: tasksRes.data, 
        currentMetrics: metricsRes.data, 
        loading: false 
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  selectProject: async (project: Project) => {
    set({ currentProject: project, loading: true, error: null });
    try {
      const [tasksRes, metricsRes] = await Promise.all([
        taskService.getByProject(project._id),
        projectService.getMetrics(project._id),
      ]);
      set({ 
        currentTasks: tasksRes.data, 
        currentMetrics: metricsRes.data, 
        loading: false 
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createProject: async (name: string, description?: string) => {
    set({ loading: true, error: null });
    try {
      await projectService.create({ name, description });
      const response = await projectService.getAll();
      set({ projects: response.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createTask: async (projectId: string, name: string) => {
    try {
      await taskService.create({ name, projectId });
      // Refresh tasks and metrics
      const [tasksRes, metricsRes] = await Promise.all([
        taskService.getByProject(projectId),
        projectService.getMetrics(projectId),
      ]);
      set({ currentTasks: tasksRes.data, currentMetrics: metricsRes.data });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  completeTask: async (taskId: string) => {
    try {
      await taskService.complete(taskId);
      const { currentProject } = get();
      if (currentProject) {
        // Refresh tasks and metrics
        const [tasksRes, metricsRes] = await Promise.all([
          taskService.getByProject(currentProject._id),
          projectService.getMetrics(currentProject._id),
        ]);
        set({ currentTasks: tasksRes.data, currentMetrics: metricsRes.data });
      }
    } catch (err: any) {
      set({ error: err.message });
    }
  },
}));
