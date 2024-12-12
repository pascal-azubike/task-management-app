import axios from 'axios';
import { Task, TaskFormData } from '../types/task';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Keep track of user-created tasks only
let currentTasks: Task[] = [];
let nextId = 1; // Keep track of next available ID

export const taskService = {
  async getTasks(): Promise<Task[]> {
    return currentTasks;
  },

  async createTask(task: TaskFormData): Promise<Task> {
    try {
      // Send to API
      await axios.post(API_URL, {
        title: task.title,
        completed: task.completed,
        userId: 1
      });

      // Create new task with our own ID
      const newTask: Task = {
        ...task,
        id: nextId++, // Use and increment our own ID counter
      };

      // Add to current session
      currentTasks = [newTask, ...currentTasks];
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      // Still create task with our own ID even if API fails
      const newTask: Task = {
        ...task,
        id: nextId++,
      };
      currentTasks = [newTask, ...currentTasks];
      return newTask;
    }
  },

  async updateTask(id: number, task: TaskFormData): Promise<Task> {
    try {
      // Simulate API update
      await axios.patch(`${API_URL}/${id}`, {
        title: task.title,
        completed: task.completed
      });

      // Update in current session using our ID
      const updatedTask: Task = { ...task, id };
      currentTasks = currentTasks.map(t => t.id === id ? updatedTask : t);
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      // Still update locally even if API fails
      const updatedTask: Task = { ...task, id };
      currentTasks = currentTasks.map(t => t.id === id ? updatedTask : t);
      return updatedTask;
    }
  },

  async deleteTask(id: number): Promise<void> {
    try {
      // Attempt API delete
      await axios.delete(`${API_URL}/${id}`);
      // Remove from current session
      currentTasks = currentTasks.filter(t => t.id !== id);
    } catch (error) {
      console.error('Error deleting task:', error);
      // Still remove from current session if API fails
      currentTasks = currentTasks.filter(t => t.id !== id);
    }
  }
}; 