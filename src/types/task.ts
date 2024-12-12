export type Priority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: number;
  title: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
}

export interface TaskFormData {
  title: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
} 