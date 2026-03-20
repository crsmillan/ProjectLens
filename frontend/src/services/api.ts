import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const projectService = {
  getAll: () => api.get('/projects'),
  getById: (id: string) => api.get(`/projects/${id}`),
  create: (data: { name: string; description?: string }) => api.post('/projects', data),
  getMetrics: (id: string) => api.get(`/projects/${id}/metrics`),
};

export const taskService = {
  create: (data: { name: string; projectId: string }) => api.post('/tasks', data),
  complete: (id: string) => api.patch(`/tasks/${id}/complete`),
  getByProject: (projectId: string) => api.get(`/tasks?projectId=${projectId}`),
};

export default api;
