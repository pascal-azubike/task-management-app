import { useState, useEffect } from 'react';
import { ConfigProvider, Modal } from 'antd';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ProjectInfo from './components/ProjectInfo';
import Navbar from './components/Navbar';
import { Task, TaskFormData } from './types/task';
import { taskService } from './services/taskService';
import { ThemeProvider, useTheme, getThemeConfig } from './contexts/ThemeContext';
import './App.css';

/**
 * Root component of the application.
 * Manages the overall layout structure and routing between different views.
 * Provides theme context and mock API data management.
 */
const AppContent = () => {
  const { isDarkMode } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await taskService.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (data: TaskFormData) => {
    try {
      const newTask = await taskService.createTask(data);
      setTasks([newTask, ...tasks]);
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };

  const handleUpdateTask = async (data: TaskFormData) => {
    if (!editingTask) return;
    try {
      const updatedTask = await taskService.updateTask(editingTask.id, data);
      setTasks(prevTasks => prevTasks.map(task => 
        task.id === editingTask.id ? updatedTask : task
      ));
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await taskService.deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask({...task});
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <ConfigProvider theme={getThemeConfig(isDarkMode)}>
      <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-50'}`}>
        <Navbar />
        <div className="px-4 md:px-12 py-8 pt-24">
          <ProjectInfo />
          
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3 container mx-auto">
              <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-zinc-100' : 'text-gray-700'}`}>
                Add New Task
              </h2>
              <div className="form-container p-6">
                <TaskForm onSubmit={handleCreateTask} />
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-zinc-100' : 'text-gray-700'}`}>
                Task List
              </h2>
              <div className="form-container p-6">
                <div className="overflow-x-auto">
                  <TaskList
                    tasks={tasks}
                    onEdit={handleEdit}
                    onDelete={handleDeleteTask}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>

          <Modal
            title={<span className={`text-lg font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-gray-800'}`}>
              Edit Task
            </span>}
            open={isModalOpen}
            onCancel={handleModalClose}
            footer={null}
            className="form-container"
            destroyOnClose
          >
            {editingTask && (
              <TaskForm
                key={editingTask.id}
                onSubmit={handleUpdateTask}
                initialValues={editingTask}
                isEditing
              />
            )}
          </Modal>
        </div>
      </div>
    </ConfigProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App; 