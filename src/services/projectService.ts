import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { Project } from '../utils/mockData';

// ✅ IMPORTANT: must include /api
const API_BASE_URL = "http://localhost:8080/api";

class ProjectService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // ✅ GET ALL PROJECTS (handles pagination)
  async getProjects(): Promise<Project[]> {
    try {
      const response = await this.api.get('/projects');

      // Spring Boot Page → content
      return response.data.content || response.data;

    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  // ✅ GET BY ID
  async getProject(id: string): Promise<Project> {
    try {
      const response = await this.api.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  }

  // ✅ CREATE PROJECT
  async createProject(project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
    try {
      const response = await this.api.post('/projects', project);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  // ✅ UPDATE PROJECT
  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    try {
      const response = await this.api.put(`/projects/${id}`, project);
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  // ✅ DELETE PROJECT
  async deleteProject(id: string): Promise<void> {
    try {
      await this.api.delete(`/projects/${id}`);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  // ✅ SEARCH / FILTER
  async filterProjects(filters: {
    status?: string;
    search?: string;
  }): Promise<Project[]> {
    try {
      const params: any = {};

      if (filters.search) {
        params.client = filters.search; // matches backend
      }

      if (filters.status) {
        params.status = filters.status;
      }

      const response = await this.api.get('/projects/search', { params });

      return response.data.content || response.data;

    } catch (error) {
      console.error('Error filtering projects:', error);
      throw error;
    }
  }

  // ✅ ANALYTICS
  async getAnalytics(): Promise<any> {
    try {
      const response = await this.api.get('/projects/analytics');
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }
}

export default new ProjectService();