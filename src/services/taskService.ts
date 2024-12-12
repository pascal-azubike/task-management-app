import axios from 'axios';
import { Task, TaskFormData } from '../types/task';

const API_URL = 'https://675b22589ce247eb1935bcff.mockapi.io/api/v1/tasks';

/**
 * Service that handles API interactions for task operations.
 * Uses MockAPI for data persistence and CRUD operations.
 */
export const taskService = {
  async getTasks(page: number = 1, limit: number = 10): Promise<{ data: Task[], total: number }> {
    try {
      const response = await axios.get<Task[]>(API_URL, {
        params: {
          page,
          limit,
        },
      });
      
      const total = parseInt(response.headers['x-total-count'] || '0');
      
      return {
        data: response.data,
        total,
      };
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  async createTask(task: TaskFormData): Promise<Task> {
    try {
      // Format the task data according to the API requirements
      const taskData = {
        title: task.title,
        completed: task.completed || false,
        priority: task.priority,
        dueDate: task.dueDate,
        createdAt: new Date().toISOString(),
      };

      const response = await axios.post<Task>(API_URL, taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  async updateTask(id: number | string, task: TaskFormData): Promise<Task> {
    try {
      // Format the update data according to the API requirements
      const updateData = {
        title: task.title,
        completed: task.completed,
        priority: task.priority,
        dueDate: task.dueDate,
        updatedAt: new Date().toISOString(),
      };

      const response = await axios.put<Task>(`${API_URL}/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  async deleteTask(id: number | string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}; 